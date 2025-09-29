Rails.application.routes.draw do
  # 認証機能（全体共通）
  devise_for :users, path: '', path_names: {
                                 sign_in: 'login',
                                 sign_out: 'logout',
                                 registration: 'signup'
                               },
                     controllers: {
                       sessions: 'users/sessions', # ログイン・ログアウト処理
                       registrations: 'users/registrations' # ユーザー登録処理
                     }

  # ヘルスチェック用ルート
  get '/health', to: 'application#health'

  

  # API用のnamespace
  namespace :api do
    namespace :v1 do
      get '/me', to: 'users#me'               # ユーザー情報取得
      get '/check_login_status', to: 'users#check_login_status'
    end
  end
end
