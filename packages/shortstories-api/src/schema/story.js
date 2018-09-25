import { gql } from 'apollo-server-express'

export default gql`
  type Story {
    id: ID!
    title: String!
    body: String!
    user: User!
    likedBy: [Reaction!]!
    dislikedBy: [Reaction!]!
    viewedBy: [View!]!
    comments: [Comment!]!
    createdAt: String!
  }

  type Reaction {
    id: ID!
    userId: ID!
    storyId: ID!
  }

  type View {
    id: ID!
    userId: ID!
    storyId: ID!
  }

  type StoryConnection {
    edges: [Story!]!
    pageInfo: StoriesPageInfo!
  }

  type StoriesPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  extend type Query {
    stories(cursor: String, limit: Int = 100): StoryConnection!
    story(id: ID!): Story!
  }

  extend type Mutation {
    createStory(title: String!, body: String!): Story!
    updateStory(id: ID!, title: String, body: String): Story!
    likeStory(id: ID!): Reaction!
    dislikeStory(id: ID!): Reaction!
    viewStory(id: ID!): View!
    deleteStory(id: ID!): Boolean!
  }
`
