class StoryRepository < Hanami::Repository
  associations do
    belongs_to :user
  end

  def all_approved
    stories
      .where(state: 'approved')
  end

  def with_user
    aggregate(:user)
  end
end
