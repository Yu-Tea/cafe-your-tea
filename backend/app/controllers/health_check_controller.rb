class HealthCheckController < ApplicationController
  def index
    render json: { status: 'ok' }, status: :ok
  end
end
