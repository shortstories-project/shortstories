import { GraphQLServer } from 'graphql-yoga'
import DataLoader from 'dataloader'
import resolvers from './resolvers'
import models from './models'
import loaders from './loaders'

const userLoader = new DataLoader(keys => loaders.user.batchUsers(keys, models))
const storyLoader = new DataLoader(keys => loaders.story.batchStories(keys, models))

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({
      ...req,
      models,
      loaders: {
        user: userLoader,
        story: storyLoader,
      },
    }),
  })
}

export default createServer
