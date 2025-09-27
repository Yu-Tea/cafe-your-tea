Rails.application.routes.draw do
  # ヘルスチェック用ルート
  get '/health', to: 'application#health'
  
  # 将来的なAPI用のnamespace
  namespace :api do
    namespace :v1 do
      # 今後APIエンドポイントを追加予定
    end
  end
end
