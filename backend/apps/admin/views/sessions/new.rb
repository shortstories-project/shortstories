module Admin::Views::Sessions
  class New
    include Admin::View
    def form
      Form.new(:session, routes.sessions_path)
    end
  end
end