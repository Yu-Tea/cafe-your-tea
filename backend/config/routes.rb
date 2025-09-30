Rails.application.routes.draw do
  # ヘルスチェック用ルート
  get '/health', to: 'application#health'

  # API用のnamespace
  namespace :api do
    namespace :v1 do
      post 'login', to: 'authentication#login'
      post 'logout', to: 'authentication#logout'
      get 'me', to: 'authentication#me'
      # ユーザー管理
      resources :users, only: %i[create]
    end
  end
end
