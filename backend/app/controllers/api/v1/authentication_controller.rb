class Api::V1::AuthenticationController < ApplicationController

  # メールアドレス＋パスワードのログイン
  def login
    user = User.authenticate_by(email: params[:email], password: params[:password])
    if user
      token = TokenGenerator.encode(user.id)
      cookie_options = jwt_cookie_options(token)
      cookies[:jwt] = cookie_options
      render json: {
        name: user.name,
        email: user.email,
        debug_info: 'Token generated and cookie set'
      }
    else
      render json: { status: 'メールアドレスかパスワードが間違っています。' }, status: :unprocessable_entity
    end
  rescue StandardError
    render json: { error: 'Internal server error' }, status: :internal_server_error
  end

  # Googleログイン
  def google_login
    auth_code = params[:code]
    return render json: { error: "認証コードが見つかりません" }, status: :bad_request if auth_code.blank?

    begin
      response = GoogleAuthService.new(auth_code).authenticate!

      if response[:success]
        user = response[:success]
        token = TokenGenerator.encode(user.id)
        cookies[:jwt] = jwt_cookie_options(token)

        render json: {
          name: user.name, 
          email: user.email, 
        }, status: :ok
      else
        render json: { error: response[:error] }, status: response[:status] || :unprocessable_entity
      end
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def logout
    delete_options = jwt_cookie_options_for_delete
    cookies.delete(:jwt, delete_options)
    
    render json: { message: "ログアウトしました" }, status: :ok
  end


  def me
    if @current_user
      render json: {
        logged_in: true,
        id: @current_user.id,
        name: @current_user.name,
        bio: @current_user.bio,
        avatar_preset: @current_user.avatar_preset
      }, status: :ok
    else
      render json: { logged_in: false, name: '' }, status: :unauthorized
    end
  end

  private

  # Cookie削除用のオプション
  def jwt_cookie_options_for_delete
    if Rails.env.production?
      {
        path: '/',
        secure: true,
        httponly: true,
        same_site: :none
      }
    else
      {
        path: '/',
        secure: false,
        httponly: true,
        same_site: :lax
      }
    end
  end
end
