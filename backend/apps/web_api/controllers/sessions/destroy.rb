module WebApi::Controllers::Sessions
  class Destroy
    include WebApi::Action

    def call(params)
      warden.logout
      redirect_to '/'
    end
  end
end