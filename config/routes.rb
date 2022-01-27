Rails.application.routes.draw do

  resources :blogs, only: [:show, :index]
  resources :comments, only: [:index, :create, :destroy]
  resources :categories, only: [:index]

  root to: 'blogs#index'

  get 'login' => 'home#login'
  get 'auth' => 'home#auth'

  namespace :zero do
    resource :session, only: [:new, :create, :destroy]
    resources :blogs do
      resources :comments
      member do
        post :submit
      end
    end
    resources :comments, only: [:index, :show, :destroy]
    resources :categories
    resources :users, only: [:index, :destroy]
    delete 'blobs/:signed_id' => 'blobs#destroy'
    root to: 'dashboard#index'
  end
end
