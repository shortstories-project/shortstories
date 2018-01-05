module WebApi::Controllers::Sessions
  class Failure
    include WebApi::Action

    def call(params)
      status 404, "Not found"
    end
  end
end