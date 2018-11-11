Rails.application.routes.draw do

  resources :blogs, only: [:show, :index]
  resources :comments, only: [:create]
  resources :categories, only: [:index]
  get 'about' => 'home#index'
  root to: 'blogs#index'
  
  namespace :zero do
    resource :session, only: [:new, :create, :destroy]
    resources :blogs do
      resources :comments
      member do
        post :delete_image
      end
      collection do 
        post :preview
      end
    end
    resources :comments
    resources :categories
    resources :users, only: [:index]

    root to: 'dashboard#index'
  end
end
