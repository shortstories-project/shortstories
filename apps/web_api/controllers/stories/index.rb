module WebApi::Controllers::Stories
  class Index
    include WebApi::Action
  
    def call(_)
      status 200, JSON.generate(Stories.all.as_json)
    end
  end
end