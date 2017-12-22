# Configure your routes here
# See: http://hanamirb.org/guides/routing/overview/
#
# Example:
# get '/hello', to: ->(env) { [200, {}, ['Hello from Hanami!']] }

post '/auth/:provider/callback', to: 'session#create'
get '/auth/:provider/callback', to: 'session#create'

resources :stories, only: [:index, :create, :destroy]