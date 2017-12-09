module WebApi::Controllers::Stories
  class Create
    include WebApi::Action

    params do
      required(:text).filled(:str?)
    end
  
    def call(params)
      repository = StoryRepository.new
      if params.valid?
        record = repository.create(params.to_h)
        status 200, JSON.generate(record.to_h)
      else
        status 422, JSON.generate(error: 'not valid')
      end
    end
  end
end