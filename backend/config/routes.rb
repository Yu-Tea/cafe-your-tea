Rails.application.routes.draw do
  # ヘルスチェック用ルート
  get '/health', to: 'application#health'
  # OGP用ルート
  get '/ogp/tea_arts/:id', to: 'ogp#tea_art', as: :ogp_tea_art

  # API用のnamespace
  namespace :api do
    namespace :v1 do
      post 'login', to: 'authentication#login'
      post 'logout', to: 'authentication#logout'
      get 'me', to: 'authentication#me'

      resources :users, only: %i[create show]
      resources :tea_arts, only: %i[index show create update destroy] do
        collection do
          get :search_by_tag  # タグ検索専用
          get :search         # 総合検索用
        end
      end
      resources :tags, only: [:index]

      resource :user, only: [:update]
    end
  end
end
