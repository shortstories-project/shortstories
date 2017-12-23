module Admin::Controllers::Sessions
  class Create
    include Admin::Action

    def call(_)
      admin_user = AdminUserRepository.new.find_by_email(requested_email)

      if !admin_user.nil? && password_correct?(admin_user)
        session[:admin_user_id] = admin_user.id

        redirect_to routes.root_path
      else
        redirect_to routes.new_session_path
      end
    end

    private

    def password_correct?(admin_user)
      BCrypt::Password.new(admin_user.password) == requested_password
    end

    def requested_email
      params[:session][:email]
    end

    def requested_password
      params[:session][:password_plain]
    end
    
    def authenticate!; end
  end
end