class ApplicationController < ActionController::API
  def health
    render json: {
      status: 'ok',
      message: 'Tea Shop API is running!',
      timestamp: Time.current.iso8601,
      version: '1.0.0',
      environment: Rails.env,
      database: database_status
    }
  end

  private

  def database_status
    # データベース接続確認
    ActiveRecord::Base.connection.execute('SELECT 1')
    'connected'
  rescue => e
    'disconnected'
  end
end
