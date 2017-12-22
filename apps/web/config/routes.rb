# Configure your routes here
# See: http://hanamirb.org/guides/routing/overview/
#
# Example:
# get '/hello', to: ->(env) { [200, {}, ['Hello from Hanami!']] }
delete '/session/:id', to: 'session#destroy'
get '/home', to: 'home#index'
post '/session', to: 'session#create'
get '/sign_in', to: 'users#sign_in'
get '/logout', to: 'session#destroy'
get '/users/new', to: 'users#new'
