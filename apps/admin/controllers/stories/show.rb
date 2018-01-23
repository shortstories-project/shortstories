module Admin::Controllers::Stories
  class Show
    include Admin::Action
    expose :story

    def call(id)
      repository = StoryRepository.new

      @story = repository.find(params[:id])
    end
  end
end
