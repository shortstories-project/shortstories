import { gql } from 'apollo-server-express'

export default gql`
  type Comment {
    id: ID!
    body: String!
    user: User!
    created_at: String!
  }

  type CommentConnection {
    edges: [Comment!]!
    pageInfo: CommentsPageInfo!
  }

  type CommentsPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  extend type Query {
    comments(cursor: String, limit: Int = 10): CommentConnection!
    comment(id: ID!): Comment!
  }

  extend type Mutation {
    createComment(id: ID!, body: String!): Comment!
    updateComment(id: ID!, body: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }
`
