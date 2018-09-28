import 'dotenv/config'
import './config/passport'
import path from 'path'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import connectRedis from 'connect-redis'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import DataLoader from 'dataloader'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import models from './models'
import loaders from './loaders'
import redis from './config/redis'

const RedisStore = connectRedis(session)

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cookieParser())
app.use(
  session({
    store: new RedisStore({
      client: redis,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
  })
)

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('Validation error: ', '')
      .replace('UserInputError: ', '')
      .replace('AuthenticationError: ', '')
    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => ({
    models,
    me: req.user,
    req,
    loaders: {
      user: new DataLoader(keys => loaders.batchUsers(keys, models)),
    },
  }),
})

server.applyMiddleware({ app, path: '/graphql' })

app.use('/img/photos', express.static(path.join(__dirname, 'uploads')))
app.use('/img/assets', express.static(path.join(__dirname, 'assets')))

const port = process.env.PORT || 8000

app.listen({ port }, () => {
  // eslint-disable-next-line
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
})
