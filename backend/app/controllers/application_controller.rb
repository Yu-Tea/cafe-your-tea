class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Rails.application.routes.url_helpers

  # 全リクエストで認証状態
  before_action :set_current_user

  # APIエラーハンドリング
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_unprocessable_entity
  rescue_from StandardError, with: :handle_internal_server_error

  def set_current_user
    token = cookies[:jwt]

    if token
      begin
        decoded_token = TokenGenerator.decode(token)

        user_id = decoded_token['token']

        @current_user = User.find_by(id: user_id)
      rescue StandardError
        @current_user = nil
      end
    else
      @current_user = nil
    end
  end

  attr_reader :current_user

  # 認証必須チェック
  def authenticate_user!
    return unless @current_user.nil?

    render json: { error: 'ログインが必要です' }, status: :unauthorized
  end

  protected

  def jwt_cookie_options(token)
    if Rails.env.production?
      {
        value: token,
        expires: 24.hours.from_now,
        secure: true,
        httponly: true,
        same_site: :none,
        path: '/'
      }
    else
      {
        value: token,
        expires: 24.hours.from_now,
        secure: false,
        httponly: true,
        same_site: :lax,
        path: '/'
      }
    end
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

  # 上記のタグ部分用
  def tag_json(tag)
    {
      id: tag.id,
      name: tag.name
    }
  end

  # ページネーション用
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

  private

  # エラーハンドリングメソッド
  def handle_not_found(exception)
    render json: {
      error: {
        type: 'NotFound',
        message: 'リソースが見つかりません',
        details: exception.message
      }
    }, status: :not_found
  end

  def handle_unprocessable_entity(exception)
    render json: {
      error: {
        type: 'ValidationError',
        message: 'バリデーションエラーが発生しました',
        details: exception.record.errors.full_messages
      }
    }, status: :unprocessable_entity
  end

  def handle_internal_server_error(_exception)
    render json: {
      error: {
        type: 'InternalServerError',
        message: 'サーバー内部エラーが発生しました'
      }
    }, status: :internal_server_error
  end
end
