Rails.application.routes.draw do

  resources :blogs, only: [:show, :index]
  resources :comments, only: [:create]
  resources :categories, only: [:index]

  get :auth, controller: "application"

  get 'about' => 'home#index'
  root to: 'blogs#index'
  get 'login' => 'home#login'

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
