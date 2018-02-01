require 'hanami/interactor'

module Interactors
  module Stories
    class Approve
      include Hanami::Interactor

      expose :story

      def initialize(story_id)
        @story = repo.find(story_id)
      end

      def call
        return error('No story found') unless @story
        return error('Story already approved') if @story.approved?

        repo.update(@story.id, state: 'approve')
      end

      private

      def repo
        StoryRepository.new
      end
    end
  end
end