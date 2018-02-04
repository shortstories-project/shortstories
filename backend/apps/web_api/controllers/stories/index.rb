module WebApi::Controllers::Stories
  class Index
    include WebApi::Action
    include Hanami::Serializer::Action

    def call(_)
      collection = repo.all_approved.map { |s| serializer.new(s) }

      send_json(collection)
    end

    private

    def repo
      StoryRepository.new
    end
  end
end