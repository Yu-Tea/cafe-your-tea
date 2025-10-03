Rails.application.routes.draw do
  # ヘルスチェック用ルート
  get '/health', to: 'application#health'

  # API用のnamespace
  namespace :api do
    namespace :v1 do
      post 'login', to: 'authentication#login'
      post 'logout', to: 'authentication#logout'
      get 'me', to: 'authentication#me'

      resources :users, only: %i[create show]
      resources :tea_arts, only: %i[index show create update destroy]
      resources :tags, only: [:index]

      resource :user, only: [:update]
    end
  end
end
