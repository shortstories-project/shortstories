module WebApi::Controllers::Stories
  class Index
    include WebApi::Action
  
    def call(_)
      repository = StoryRepository.new

      status 200, JSON.generate({ stories: repository.all.map(&:to_h) })
    end
  end
end