Rails.application.routes.draw do

  resources :blogs, only: [:show, :index]
  resources :comments, only: [:create, :index]
  resources :categories, only: [:index]

  root to: 'blogs#index'

  get 'login' => 'home#login'
  get 'about' => 'home#index'
  get 'auth' => 'home#auth'

  namespace :zero do
    resource :session, only: [:new, :create, :destroy]
    resources :blogs do
      resources :comments
      member do
        post :delete_image
        post :submit
      end
    end
    resources :comments
    resources :categories
    resources :users, only: [:index]

    root to: 'dashboard#index'
  end
end
