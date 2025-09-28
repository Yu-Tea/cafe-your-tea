class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json

  private

  # ログイン成功時の処理
  def respond_with(resource, _opts = {})
    render json: { 
      message: 'ログインしました', 
      user: {
        id: resource.id,
        email: resource.email,
        name: resource.name
      }
    }, status: :ok
  end

  # ログアウト時の処理
  def respond_to_on_destroy
    if current_user
      log_out_success
    else
      log_out_failure
    end
  end

  def log_out_success
    render json: { message: "ログアウトしました" }, status: :ok
  end

  def log_out_failure
    render json: { message: "ログアウトに失敗しました" }, status: :unauthorized
  end
end
