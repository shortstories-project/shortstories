module WebApi::Controllers::Session
  class Create
    include WebApi::Action

    def auth_hash
      request.env['omniauth.auth']
    end

    def call(params)

    end
  end
end