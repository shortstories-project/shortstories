import { gql } from 'apollo-server-express'

export default gql`
  type Me {
    id: ID!
    username: String!
    avatar: String
    email: String!
    writtenStories: [Story!]!
    likedStories: [Story!]!
    viewedStories: [Story!]!
  }

  type User {
    id: ID!
    username: String!
    avatar: String
    writtenStories: [Story!]!
  }

  extend type Query {
    me: Me
    user(id: ID!): User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Me!
    signIn(login: String!, password: String!): Me!
    signOut: Boolean!
    updateUser(username: String, avatar: String): Me!
    addAvatar(avatarImage: Upload!): Me!
  }
`
