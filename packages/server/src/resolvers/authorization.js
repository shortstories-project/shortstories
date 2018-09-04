import { ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { req }) => 
  req.user ? skip : new ForbiddenError('Not authenticated as user.')

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { req }) =>
    req.user.role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.')
)

export const isStoryOwner = async (
  parent,
  { id },
  { models, req },
) => {
  const story = await models.Story.findById(id, { raw: true })
  if (story.userId !== req.user.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }
  return skip
}

export const isCommentOwner = async (parent, { id }, { models, req }) => {
  const comment = await models.Comment.findById(id, { raw: true })
  if (comment.userId !== req.user.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }
  return skip
}
