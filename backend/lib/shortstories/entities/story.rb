class Story < Hanami::Entity
  def approved?
    state == 'approve'
  end
end
