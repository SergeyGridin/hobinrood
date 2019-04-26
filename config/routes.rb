Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    get '/users/:id/complete', to: 'users#complete'
    get '/users/:id/historical', to: 'users#historical'

    resource :session, only: [:create, :destroy]
    resources :stocks, only: [:index]
    get '/stocks/:ticker', to: 'stocks#show'
    resources :transactions, except: [:new, :edit]
    resources :watchlist_items, only: [:create, :destroy, :show]
  end
end
