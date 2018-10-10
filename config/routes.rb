Rails.application.routes.draw do

  resources :blogs, only: [:show, :index]

  root to: 'blogs#index'
  
  namespace :zero do
    resource :session, only: [:new, :create, :destroy]
    resources :blogs do
      resources :comments
    end
    resources :comments
    resources :categories
    resources :users, only: [:index]

    root to: 'dashboard#index'
  end
end
