module WebApi::Serializers
  module Profile
    class Show < Hanami::Serializer::Base
      attribute :id, Types::Int
      attribute :name, Types::String
      attribute :avatar, Types::String
      attribute :email, Types::String
    end
  end
end 