import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    stories(cursor: String, limit: Int): StoryConnection!
    story(id: ID!): Story!
  }

  extend type Mutation {
    createStory(title: String!, body: String!): Story!
    updateStory(id: ID!, title: String, body: String): Story!
    likeStory(id: ID!): StoryInfo!
    dislikeStory(id: ID!): StoryInfo!
    viewStory(id: ID!): StoryInfo!
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

  type StoryInfo {
    id: ID!
    user: User!
    storyId: ID!
  }

  type Story {
    id: ID!
    title: String!
    body: String!
    user: User!
    createdAt: String!
    likedBy: [StoryInfo!]
    dislikedBy: [StoryInfo!]
    viewedBy: [StoryInfo!]
    comments: [Comment!]
  }
`
