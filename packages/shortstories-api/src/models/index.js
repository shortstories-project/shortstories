import Knex from 'knex'
import { Model } from 'objection'
import connection from '../../knexfile'
import User from './user'
import Story from './story'
import Reaction from './reaction'
import Comment from './comment'
import View from './view'

const { test, development, production } = connection
let knexConnection

if (process.env['NODE_ENV'] === 'development') {
  knexConnection = Knex(development)
} else if (process.env['NODE_ENV'] === 'test') {
  knexConnection = Knex(test)
} else {
  knexConnection = Knex(production)
}

Model.knex(knexConnection)

const models = {
  User,
  Story,
  Comment,
  Reaction,
  View,
}

export default models
