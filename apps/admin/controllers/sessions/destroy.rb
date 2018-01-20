module Admin::Controllers::Sessions
  class Destroy
    include Admin::Action

    def call(_)
      session[:admin_user_id] = nil
      redirect_to '/'
    end
  end
end
