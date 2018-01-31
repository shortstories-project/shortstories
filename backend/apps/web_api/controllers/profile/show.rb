module WebApi::Controllers::Profile
  class Show
    include WebApi::Action

    before :authenticate!
  
    def call(_)
      status 200, JSON.generate({ profile: current_user.to_h })
    end
  end
end