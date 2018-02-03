class StoryRepository < Hanami::Repository
  def all_approved
    stories
      .where(state: 'approved')
  end
end
