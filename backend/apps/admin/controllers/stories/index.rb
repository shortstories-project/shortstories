module Admin::Controllers::Stories
  class Index
    include Admin::Action
    expose :stories

    def call(_)
      repository = StoryRepository.new

      @stories = repository.all
    end
  end
end
