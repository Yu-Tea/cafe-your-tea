class Api::V1::TeaArtsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_tea_art, only: %i[show update destroy]
  before_action :check_owner, only: %i[update destroy]

  # GET /api/v1/tea_arts
  def index
    @tea_arts = TeaArt.includes(:user, :tags)
                      .order(created_at: :desc)
                      .page(params[:page])

    render json: {
      tea_arts: @tea_arts.map { |tea_art| tea_art_list_json(tea_art) },
      pagination: pagination_json(@tea_arts)
    }
  end

  # GET /api/v1/tea_arts/:id
  def show
    @tea_art = TeaArt.find(params[:id])
    render json: {
      tea_art: tea_art_detail_json(@tea_art),
    }
  end

  # POST /api/v1/tea_arts
  def create
    # 画像処理サービスを実行
    if tea_art_params[:image_data].present?
      processor = TeaArtImageProcessor.new(
        tea_art_params[:image_data],
        tea_art_params[:title]
      )
      image_urls = processor.process # 合成ティー画像とOGP画像の両方のURLを取得
    end

    # TeaArtモデルを作成（image_dataはDBに保存しないので除外）
    create_params = tea_art_params.except(:image_data, :tag_names)
    @tea_art = current_user.tea_arts.build(create_params)
    # 画像URLを設定
    @tea_art.image_url = image_urls[:tea_art_url] if image_urls[:tea_art_url].present?
    @tea_art.ogp_image_url = image_urls[:ogp_url] if image_urls[:ogp_url].present?

    if @tea_art.save
      # タグの処理
      if tea_art_params[:tag_names].present?
        tag_names = tea_art_params[:tag_names]
        tags = tag_names.map { |name| Tag.find_or_create_by(name: name) }
        @tea_art.tags = tags
      end

      render json: {
        tea_art: tea_art_detail_json(@tea_art),
        message: 'ティーアートが作成されました'
      }, status: :created
    else
      render json: { errors: @tea_art.errors }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: {
      error: "ティーアートの作成に失敗しました: #{e.message}"
    }, status: :unprocessable_entity
  end

  # PATCH/PUT /api/v1/tea_arts/:id
  def update
    # 更新前のタイトルとOGP画像のURLを取得
    old_title = @tea_art.title
    old_ogp_url = @tea_art.ogp_image_url

    if @tea_art.update(tea_art_params)
      # タグの処理
      if tea_art_params[:tag_names].present?
        tag_names = tea_art_params[:tag_names]
        tags = tag_names.map { |name| Tag.find_or_create_by(name: name) }
        @tea_art.tags = tags
      end

      # タイトルが変更されたかチェック
      title_changed = old_title != @tea_art.title

      # タイトル変更時にOGP画像再生成
      if title_changed
        begin
          generate_ogp_image(@tea_art)

          # 古いOGP画像をCloudinaryから削除
          delete_old_ogp_image(old_ogp_url) if old_ogp_url.present?
        rescue StandardError
          # OGP処理エラーでもメイン処理は継続
        end
      end

      render json: {
        tea_art: tea_art_detail_json(@tea_art),
        message: 'ティーアートが更新されました'
      }
    else
      render json: { errors: @tea_art.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/tea_arts/:id
  def destroy
    @tea_art.destroy!
    render json: { message: 'ティーアートが削除されました' }
  end

  # 単一タグで絞り込み用
  def search_by_tag
    tag_name = params[:tag] # ← tag_nameではなくtag！

    if tag_name.blank?
      render json: {
        tea_arts: [],
        pagination: {
          current_page: 1,
          total_pages: 0,
          total_count: 0,
          per_page: 0
        },
        search_type: 'tag',
        selected_tag: nil,
        message: 'タグ名が指定されていません'
      }
      return
    end

    begin
      @tea_arts = TeaArt.joins(:tags)
                        .where(tags: { name: tag_name })
                        .includes(:tags, :user)
                        .order(created_at: :desc)
                        .page(params[:page])

      render json: {
        tea_arts: @tea_arts.map { |tea_art| tea_art_list_json(tea_art) },
        pagination: pagination_json(@tea_arts),
        search_type: 'tag',
        selected_tag: tag_name,
        total_count: @tea_arts.total_count
      }
    rescue StandardError => e
      render json: {
        error: {
          type: 'TagSearchError',
          message: "タグ検索でエラーが発生しました: #{e.message}"
        }
      }, status: :internal_server_error
    end
  end

  private

  def set_tea_art
    @tea_art = TeaArt.includes(:user, :tags).find(params[:id])
  end

  def check_owner
    return if current_user.id == @tea_art.user_id

    render json: {
      error: {
        type: 'Forbidden',
        message: '他のユーザーの作品は編集・削除できません'
      }
    }, status: :forbidden
  end

  def generate_ogp_image(tea_art)
    return if tea_art.ogp_image_url.blank?

    # 既存のprocessメソッドと同じように引数を渡す
    processor = TeaArtImageProcessor.new(nil, tea_art.title) # base64は不要なのでnil
    processor.process_ogp_update(tea_art)
  rescue StandardError => e
    Rails.logger.error "OGP画像生成エラー: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
  end

  # 🔥 コントローラー専用の削除処理
  def delete_old_ogp_image(url)
    return unless url.present?

    begin
      # URLからpublic_idを抽出
      public_id = extract_public_id_from_url(url)

      if public_id.present?
        Cloudinary::Uploader.destroy(public_id)
      else
        Rails.logger.warn 'public_idが抽出できませんでした'
      end
    end
  end

  def extract_public_id_from_url(url)
    return nil if url.blank?

    patterns = [
      %r{/upload/v\d+/(.+)\.[^.]+$},
      %r{/upload/(.+)\.[^.]+$},
      %r{/upload/[^/]+/v\d+/(.+)\.[^.]+$}
    ]

    patterns.each_with_index do |pattern, _index|
      match = url.match(pattern)
      return match[1] if match
    end

    nil
  end

  def tea_art_params
    params.require(:tea_art).permit(:title, :description, :image_url, :ogp_image_url, :season, :temperature,
                                    :image_data, tag_names: [])
  end

  # TeaArtのMenu用軽量データ
  def tea_art_list_json(tea_art)
    {
      id: tea_art.id,
      title: tea_art.title,
      season: tea_art.season_display,
      image_url: tea_art.image_url,
      tags: tea_art.tags.map { |tag| tag_json(tag) },
      tag_names: tea_art.tag_names,
      user: {
        id: tea_art.user.id,
        name: tea_art.user.name
      },
      is_owner: current_user&.id == tea_art.user_id
    }
  end

  # TeaArtの完全データ
  def tea_art_detail_json(tea_art)
    {
      id: tea_art.id,
      title: tea_art.title,
      description: tea_art.description, # 完全データでのみ取得
      season: tea_art.season_display,
      temperature: tea_art.temperature, # 完全データでのみ取得
      image_url: tea_art.image_url,
      tags: tea_art.tags.map { |tag| tag_json(tag) },
      tag_names: tea_art.tag_names,
      user: {
        id: tea_art.user.id,
        name: tea_art.user.name
      },
      is_owner: current_user&.id == tea_art.user_id
    }
  end

  def tag_json(tag)
    {
      id: tag.id,
      name: tag.name
    }
  end

  def search_params
    params.permit(:title, :user_name, :description, :tag_name, :season)
  end

  def pagination_json(collection)
    {
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      total_count: collection.total_count,
      per_page: collection.limit_value,
      next_page: collection.next_page,
      prev_page: collection.prev_page
    }
  end
end
