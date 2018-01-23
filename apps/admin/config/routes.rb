root to: "dashboard#index"

resources :sessions, only: [:new, :create] do
  collection do
    get :destroy
  end
end

resources :stories, only: [:index, :show]
