require 'bundler/setup'
require 'hanami/setup'
require 'hanami/model'
require_relative '../lib/shortstories'
require_relative '../apps/web_api/application'
require_relative '../apps/web/application'

Hanami.configure do
  mount WebApi::Application, at: '/web_api'
  mount Web::Application, at: '/web'

  model do
    ##
    # Database adapter
    #
    # Available options:
    #
    #  * SQL adapter
    #    adapter :sql, 'sqlite://db/shortstories_development.sqlite3'
    #    adapter :sql, 'postgresql://localhost/shortstories_development'
    #    adapter :sql, 'mysql://localhost/shortstories_development'
    #
    adapter :sql, ENV['DATABASE_URL']

    ##
    # Migrations
    #
    migrations 'db/migrations'
    schema     'db/schema.sql'
  end

  mailer do
    root 'lib/shortstories/mailers'

    # See http://hanamirb.org/guides/mailers/delivery
    delivery :test
  end

  environment :development do
    # See: http://hanamirb.org/guides/projects/logging
    logger level: :debug
  end

  environment :production do
    logger level: :info, formatter: :json, filter: []

    mailer do
      delivery :smtp, address: ENV['SMTP_HOST'], port: ENV['SMTP_PORT']
    end
  end
end
