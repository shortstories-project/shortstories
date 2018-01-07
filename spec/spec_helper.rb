# Require this file for unit tests

ENV['HANAMI_ENV'] ||= 'test'

require 'rspec/hanami'
require 'database_cleaner'

require_relative '../config/environment'
Hanami.boot


Dir[__dir__ + '/support/**/*.rb'].each { |f| require f }

RSpec.configure do |config|
  config.include RSpec::Hanami::Matchers

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
end

def omniauth_params
  {
    uid: '123456',
    info: {
      name: 'Test',
      email: 'example@example.ru'
    }
  }
end

def warden
  @warden ||= begin
                manager = Warden::Manager.new(nil)
                Warden::Proxy.new({ 'rack.session' => {} }, manager)
              end
end

def app
  Hanami.app
end

