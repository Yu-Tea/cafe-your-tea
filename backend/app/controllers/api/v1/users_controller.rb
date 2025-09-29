class Api::V1::UsersController < ApplicationController
  def me
    if current_user
      render json: {
          logged_in: true,
          id: current_user.id,
          name: current_user.name,
          email: current_user.email,
          bio: current_user.bio,
          avatar_preset: current_user.avatar_preset,
          provider: current_user.provider
      }
    else
      render json: {
        logged_in: false,
        name: "",
      }, status: :ok 
    end
  end
end