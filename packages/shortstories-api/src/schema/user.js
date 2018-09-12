import { gql } from 'apollo-server-express'

export default gql`
  type Me {
    id: ID!
    username: String!
    photo: String!
    email: String!
    writtenStories: [Story!]!
    likedStories: [Story!]!
    viewedStories: [Story!]!
  }

  type User {
    id: ID!
    username: String!
    photo: String
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
      avatar: String!
    ): Me!
    signIn(login: String!, password: String!): Me!
    signOut: Boolean!
    updateUser(username: String, avatar: String): Me!
    postPhoto(
      file: Upload!
      width: Float!
      height: Float!
      x: Float!
      y: Float!
    ): Me!
  }
`
