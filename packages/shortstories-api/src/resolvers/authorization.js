import { ForbiddenError } from 'apollo-server'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { req }) =>
  req.user ? skip : new ForbiddenError('Not authenticated as user.')

export const isStoryOwner = async (parent, { id }, { models, me }) => {
  const story = await models.Story.query().findById(id)
  if (story.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }
  return skip
}

export const isCommentOwner = async (parent, { id }, { models, me }) => {
  const comment = await models.Comment.query().findById(id)
  if (comment.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }
  return skip
}
