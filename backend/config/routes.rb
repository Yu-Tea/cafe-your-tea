Rails.application.routes.draw do
  get 'up' => 'rails/health#show', as: :rails_health_check
  root to: 'health_check#index'

  # ティー詳細ページ動的OGP用
  get '/ogp/tea_arts/:id', to: 'ogp#tea_art', as: :ogp_tea_art

  # API用
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

        # ネストしたコメントリソース（作成・一覧取得）
        resources :comments, only: %i[index create]
      end
      resources :tags, only: [:index]

      # 個別コメント操作（編集・削除・詳細）
      resources :comments, only: %i[update destroy]

      resource :user, only: [:update]
    end
  end
end
