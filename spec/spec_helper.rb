# Require this file for unit tests

ENV['HANAMI_ENV'] ||= 'test'

require_relative '../config/environment'
require 'rspec/hanami'

Dir[__dir__ + '/support/**/*.rb'].each { |f| require f }

def omniauth_params
  OmniAuth.config.mock_auth
end

def warden
  @warden ||= begin
                manager = Warden::Manager.new(nil)
                Warden::Proxy.new({ 'rack.session' => {} }, manager)
              end
end

RSpec.configure do |config|
  config.include RSpec::Hanami::Matchers
end

Hanami.boot
