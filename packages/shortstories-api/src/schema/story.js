import { gql } from 'apollo-server-express'

export default gql`
  type Story {
    id: ID!
    title: String!
    body: String!
    user: User!
    likedBy: [Like!]!
    dislikedBy: [Dislike!]!
    viewedBy: [View!]!
    comments: [Comment!]!
    createdAt: String!
  }

  type Like {
    id: ID!
    user: User!
    storyId: ID!
  }

  type Dislike {
    id: ID!
    user: User!
    storyId: ID!
  }

  type View {
    id: ID!
    user: User!
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

  input StoriesInput {
    cursor: String
    limit: Int = 100
  }

  input CreateStoryInput {
    title: String!
    body: String!
  }

  input UpdateStoryInput {
    id: ID!
    title: String
    body: String
  }

  extend type Query {
    stories(input: StoriesInput): StoryConnection!
    story(id: ID!): Story!
  }

  extend type Mutation {
    createStory(title: String!, body: String!): Story!
    updateStory(input: UpdateStoryInput!): Story!
    likeStory(id: ID!): Like!
    dislikeStory(id: ID!): Dislike!
    viewStory(id: ID!): View!
    deleteStory(id: ID!): Boolean!
  }
`
