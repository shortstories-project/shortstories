import { ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) => 
  me ? skip : new ForbiddenError('Not authenticated as user.')

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.')
)

export const isStoryOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const story = await models.Story.findById(id, { raw: true })

  if (story.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }

  return skip
}
