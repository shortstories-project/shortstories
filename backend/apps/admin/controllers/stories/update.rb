module Admin::Controllers::Stories
  class Update
    include Admin::Action

    # TODO: fix it
    def call(params)
      Interactors::Stories::CMD.new(params[:id]).call(params[:story][:cmd])

      redirect_to routes.story_path(params[:id])
    end
  end
end