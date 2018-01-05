class UserRepository < Hanami::Repository
  def auth!(auth_hash)
    info = auth_hash[:info]
    twitter_id = info[:uid].to_i

    attrs = {
      name: info['name'],
      email: info['email']
    }
    binding.pry
    if user = users.where(twitter_id: attrs[:twitter_id]).first
      user.update(attrs)
      update(user)
    else
      create(User.new(attrs.merge(twitter_id: twitter_id)))
    end
  end
end
