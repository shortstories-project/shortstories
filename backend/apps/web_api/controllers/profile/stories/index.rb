module WebApi::Controllers::Profile::Stories
  class Index
    include WebApi::Action
    include Hanami::Serializer::Action

    before :authenticate!

    def call(_)
      object = scope.map { |s| serializer.new(s) }

      send_json(stories: object)
    end

    def repo
      StoryRepository.new
    end

    def scope
      repo.stories.where(user_id: current_user.id)
    end
  end
end