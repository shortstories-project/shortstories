root to: "dashboard#index"

resources :sessions, only: %i[new create] do
  collection do
    get :destroy
  end
end

resources :stories, only: %i[index show update]

resources :users
