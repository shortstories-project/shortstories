import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    comments(cursor: String, limit: Int): CommentConnection!
    comment(id: ID!): Comment!
  }

  extend type Mutation {
    createComment(body: String!, id: ID!): Comment!
    updateComment(body: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }

  type CommentConnection {
    edges: [Comment!]!
    pageInfo: CommentsPageInfo!
  }

  type CommentsPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Comment {
    id: ID!
    body: String!
    user: User!
    story: Story!
    createdAt: String!
  }
`
