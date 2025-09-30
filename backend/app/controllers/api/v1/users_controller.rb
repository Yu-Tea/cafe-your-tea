class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      token = TokenGenerator.encode(user.id)
      cookies[:jwt] = jwt_cookie_options(token)

      render json: {
        status: 'ユーザーの登録に成功しました',
        name: user.name,
        email: user.email
      }
    else
      render json: {
        error: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :bio, :avatar_preset)
  end
end
