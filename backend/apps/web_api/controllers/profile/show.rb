module WebApi::Controllers::Profile
  class Show
    include WebApi::Action
    include Hanami::Serializer::Action

    before :authenticate!

    def call(_)
      object = serializer.new(current_user)

      send_json(profile: object)
    end

    def repo
      UserRepository.new
    end
  end
end