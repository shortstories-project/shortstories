module Admin::Controllers::Sessions
  class Destroy
    include Admin::Action

    def call(_)
      session[:admin_user_id] = nil
      redirect_to routes.root_path
    end
  end
end
