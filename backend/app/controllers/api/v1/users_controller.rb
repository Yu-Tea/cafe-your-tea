class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[update]

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

  # ユーザー個別orマイページ
  def show
    @user = User.find(params[:id])
    render json: {
      id: @user.id,
      name: @user.name,
      bio: @user.bio,
      avatar_preset: @user.avatar_preset,
      is_owner: current_user&.id == @user.id
    }
  end

  # マイページ編集用
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
        status: 'error',
        errors: @current_user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # マイページのギャラリー用
  def tea_arts
    user = User.find(params[:id])
    tea_arts = user.tea_arts
                   .includes(:user, :tags)
                   .order(created_at: :desc)
                   .page(params[:page])

    render json: {
      tea_arts: tea_arts.map { |tea_art| tea_art_list_json(tea_art) },
      pagination: pagination_json(tea_arts)
    }
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :bio, :avatar_preset)
  end

  def update_user_params
    params.require(:user).permit(:name, :bio, :avatar_preset)
  end
end
