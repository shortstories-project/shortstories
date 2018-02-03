module WebApi::Serializers
  module Stories
    class Index < Hanami::Serializer::Base
      attribute :id, Types::Int
      attribute :text, Types::String
      attribute :created_at, Types::DateTime
      attribute :updated_at, Types::DateTime
    end
  end
end