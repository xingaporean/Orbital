Rails.application.routes.draw do
  # API definition
  namespace 'api', defaults: { format: :json } do
    namespace 'v1' do
      
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#is_logged_in?'
      get '/approvedjobs', to: 'jobs#approved'
      get '/notapprovedjobs', to: 'jobs#notapproved'

      resources :users, :jobs
    end
  end

end
