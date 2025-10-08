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
      can_edit: current_user&.id == @tea_art.user_id
    }
  end

  # POST /api/v1/tea_arts
  def create
    # 画像処理サービスを実行（image_dataがある場合）
    image_url = nil
    if params[:tea_art][:image_data].present?
      processor = TeaArtImageProcessor.new(params[:tea_art][:image_data])
      image_url = processor.process # CloudinaryのURLを取得
    end

    # TeaArtモデルを作成（image_urlを含む）
    @tea_art = current_user.tea_arts.build(tea_art_params)
    @tea_art.image_url = image_url if image_url.present? # 画像URLを設定

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
      Rails.logger.error "ティーアート作成エラー: #{@tea_art.errors.full_messages}"
      render json: { errors: @tea_art.errors }, status: :unprocessable_entity
    end
  rescue StandardError => e
    Rails.logger.error "ティーアート作成処理エラー: #{e.message}"
    render json: {
      error: "ティーアートの作成に失敗しました: #{e.message}"
    }, status: :unprocessable_entity
  end

  # PATCH/PUT /api/v1/tea_arts/:id
  def update
    if @tea_art.update(tea_art_params)
      if tea_art_params[:tag_names].present?
        tag_names = tea_art_params[:tag_names]
        tags = tag_names.map { |name| Tag.find_or_create_by(name: name) }
        @tea_art.tags = tags
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
      Rails.logger.error "Error in search_by_tag: #{e.message}"
      Rails.logger.error e.backtrace.join("\n")

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

  def tea_art_params
    # image_dataは別途処理するのでpermitに含めなくてOK
    params.require(:tea_art).permit(:title, :description, :image_url, :season, :temperature, tag_names: [])
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
