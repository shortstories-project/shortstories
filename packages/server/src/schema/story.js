import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    stories(cursor: String, limit: Int): StoryConnection!
    story(id: ID!): Story!
  }

  extend type Mutation {
    createStory(title: String!, body: String!): Story!
    deleteStory(id: ID!): Boolean!
  }

  type StoryConnection {
    edges: [Story!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Story {
    id: ID!
    title: String!
    body: String!
    user: User!
    createdAt: String!
  }
`
