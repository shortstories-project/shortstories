module WebApi::Controllers::Sessions
  class Create
    include WebApi::Action

    def auth_hash
      request.env['omniauth.auth']
    end

    def call(params)
      user = UserRepository.new.auth!(auth_hash)
      warden.set_user(user)
      redirect_to 'http://localhost:3000/'
    end

    def warden
      request.env['warden']
    end
  end
end
