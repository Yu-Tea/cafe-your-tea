class Api::V1::UsersController < ApplicationController
  # ユーザー新規作成
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

  # マイページ編集用のupdateアクション
  def update
    if @current_user.update(update_user_params)
      render json: {
        status: 'success',
        user: {
          id: @current_user.id,
          name: @current_user.name,
          email: @current_user.email,
          bio: @current_user.bio,
          avatar_preset: @current_user.avatar_preset
        }
      }, status: :ok
    else
      render json: {
        status: 'error', # 👈 統一されたエラーステータス
        errors: @current_user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :bio, :avatar_preset)
  end

  def update_user_params
    params.require(:user).permit(:name, :bio, :avatar_preset)
  end
end
