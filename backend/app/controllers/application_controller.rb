class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Rails.application.routes.url_helpers

  # 後で消す
  def health
    render json: {
      status: 'ok',
      message: 'Cafe Your Tea API is running!',
      timestamp: Time.current.iso8601,
      version: '1.0.0',
      environment: Rails.env,
      database: database_status
    }
  end

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
        # domain: extract_domain_from_url(ENV['FRONTEND_URL']) # これはなくてもいいっぽい？
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

  private

  # def extract_domain_from_url(url)
  #   return nil unless url

  #   # "https://cafe-yt-front.vercel.app" から "cafe-yt-front.vercel.app" を抽出
  #   URI.parse(url).host
  # rescue URI::InvalidURIError
  #   nil
  # end

  # health用なので後で消す
  def database_status
    ActiveRecord::Base.connection.execute('SELECT 1')
    'connected'
  rescue StandardError
    'disconnected'
  end

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

  def extract_domain_from_url(url)
    return nil unless url

    URI.parse(url).host
  rescue URI::InvalidURIError
    nil
  end

  def database_status
    ActiveRecord::Base.connection.execute('SELECT 1')
    'connected'
  rescue StandardError
    'disconnected'
  end
end
