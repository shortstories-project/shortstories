module WebApi::Controllers::Stories
  class Destroy
    include WebApi::Action
  
    def call(params)
      repository = StoryRepository.new
      repository.delete(params[:id])

      status 200, JSON.generate({})
    end
  end
end