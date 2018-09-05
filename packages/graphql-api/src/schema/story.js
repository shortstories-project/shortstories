import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    stories(cursor: String, limit: Int): StoryConnection!
    story(id: ID!): Story!
  }

  extend type Mutation {
    createStory(title: String!, body: String!): Story!
    updateStory(id: ID!, title: String, body: String): Story!
    deleteStory(id: ID!): Boolean!
  }

  type StoryConnection {
    edges: [Story!]!
    pageInfo: StoriesPageInfo!
  }

  type StoriesPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Story {
    id: ID!
    title: String!
    body: String!
    user: User!
    createdAt: String!
    likes: Int!
    dislikes: Int!
    views: Int!
    comments: [Comment!]
  }
`
