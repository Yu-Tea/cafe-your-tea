class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json

  def create
    build_resource(sign_up_params)

    if resource.save
      render json: {
        message: "ユーザー登録が完了しました",
        user: {
          id: resource.id,
          email: resource.email,
          name: resource.name,
          bio: resource.bio,
          avatar_preset: resource.avatar_preset,
          provider: resource.provider
        }
      }, status: :created
    else
      render json: {
        message: "ユーザー登録に失敗しました",
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :bio, :avatar_preset)
  end

end
