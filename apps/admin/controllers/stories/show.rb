module Admin::Controllers::Stories
  class Show
    include Admin::Action

    def call(id)
      repository = StoryRepository.new

      @story = repository.find(id)
    end
  end
end
