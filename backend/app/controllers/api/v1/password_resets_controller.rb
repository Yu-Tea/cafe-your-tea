class Api::V1::PasswordResetsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
  
    # 登録済みユーザーには何らかのメールを送信
    if user&.email.present?
      begin
        if user.google_uid.blank?
          # 通常ユーザー：パスワードリセットトークン生成
          user.generate_password_reset_token!
        end

        # 両方のケースで同じメールメソッドを使用
        UserMailer.reset_password_email(user).deliver_now
        Rails.logger.info "Password reset email sent to #{user.email}"
      rescue => e
        Rails.logger.error "Failed to send password reset email: #{e.message}"
      end
    end

    # 存在しないメールアドレスでも同じレスポンスを返す（セキュリティ対策）
    render json: { 
      message: 'パスワードリセット手順をメールで送信しました' 
    }, status: :ok
  end

  # トークン検証用
  def show
    user = User.find_by(reset_password_token: params[:token])
    
    if user && user.reset_password_sent_at > 2.hours.ago
      render json: { 
        valid: true, 
        email: user.email,
        message: 'トークンは有効です' 
      }
    else
      render json: { 
        valid: false, 
        message: 'トークンが無効または期限切れです' 
      }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(reset_password_token: params[:token])
    
    if user.blank?
      render json: { error: 'トークンが無効です' }, status: :unprocessable_entity
      return
    end
    
    unless user.password_reset_token_valid?
      render json: { error: 'トークンの有効期限が切れています' }, status: :unprocessable_entity
      return
    end
    
    if user.reset_password!(password_params[:password], password_params[:password_confirmation])
      render json: { message: 'パスワードが正常に更新されました' }, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def password_params
    # 複数のパラメータ構造に対応
    if params[:password_reset].present? && params[:password_reset][:user].present?
      # password_reset[user] 構造の場合
      params[:password_reset].require(:user).permit(:password, :password_confirmation)
    elsif params[:user].present?
      # user 構造の場合
      params.require(:user).permit(:password, :password_confirmation)
    else
      # 直接構造の場合
      params.permit(:password, :password_confirmation)
    end
  end

  def frontend_url
    ENV['FRONTEND_URL'] || 'http://localhost:3001'
  end
end