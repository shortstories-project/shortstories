require 'hanami/interactor'

module Interactors
  module Stories
    class CMD
      include Hanami::Interactor

      expose :story

      def initialize(story_id)
        @story = repo.find(story_id)
      end

      def call(cmd)
        repo.update(@story.id, state: cmd)
      end

      def repo
        StoryRepository.new
      end
    end
  end
end