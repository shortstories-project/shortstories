class Story < Hanami::Entity
  ALLOWED_STATES = %w[approved declined unapproved].freeze

  attributes do
    attribute :id, Types::Int
    attribute :text, Types::String
    attribute :state, Types::Strict::String.enum(*ALLOWED_STATES)
    attribute :user_id, Types::String
    attribute :created_at, Types::Time
    attribute :updated_at, Types::Time
  end

  def approved?
    state == 'approved'
  end
end
