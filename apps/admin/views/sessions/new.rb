module Admin::Views::Sessions
  class New
    include Admin::View
    def form
      Form.new(:session, routes.new_session_path)
    end
  end
end