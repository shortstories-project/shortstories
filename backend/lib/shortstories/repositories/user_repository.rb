class UserRepository < Hanami::Repository
  def auth!(auth_hash)
    puts auth_hash
    info = auth_hash[:info]
    twitter_id = auth_hash[:uid]

    attrs = {
      name: info[:name],
      email: info[:email],
      twitter_id: twitter_id,
      avatar: info[:image]
    }

    if user = users.where(twitter_id: twitter_id).first
      update(user.id, attrs)
    else
      create(User.new(attrs))
    end
  end
end
