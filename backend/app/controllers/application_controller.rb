class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  
  # before_action :configure_permitted_parameters, if: :devise_controller?

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

  # protected

  # def configure_permitted_parameters
  #   # ユーザー登録時のパラメーター
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [
  #     :email, 
  #     :password, 
  #     :password_confirmation,
  #     :name,
  #     :bio,
  #     :avatar_preset, 
  #     :provider, 
  #     :uid
  #   ])
    
  #   # ログイン時のパラメーター
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [
  #     :email, 
  #     :password
  #   ])
  # end



  

  private

  def database_status
    # データベース接続確認
    ActiveRecord::Base.connection.execute('SELECT 1')
    'connected'
  rescue StandardError
    'disconnected'
  end
end
