Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # 「root」でルーティングすることができます。
  namespace :api do
    post "login", to: "auth#login"
    #「resources」でルーティングすることができます
    resources :users
    resources :articles
  end
end
