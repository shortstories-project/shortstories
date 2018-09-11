import { gql } from 'apollo-server-express'

export default gql`
  type Comment {
    id: ID!
    body: String!
    user: User!
    createdAt: String!
  }

  type CommentConnection {
    edges: [Comment!]!
    pageInfo: CommentsPageInfo!
  }

  type CommentsPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  input CommentsInput {
    cursor: String
    limit: Int = 10
  }

  input CreateComment {
    id: ID!
    body: String!
  }

  input UpdateComment {
    id: ID!
    body: String!
  }

  extend type Query {
    comments(input: CommentsInput): CommentConnection!
    comment(id: ID!): Comment!
  }

  extend type Mutation {
    createComment(input: CreateComment!): Comment!
    updateComment(input: UpdateComment!): Comment!
    deleteComment(id: ID!): Boolean!
  }
`
