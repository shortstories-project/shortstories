import Knex from 'knex'
import { Model } from 'objection'
import connection from '../../knexfile'
import User from './user'
import Story from './story'
import Reaction from './reaction'
import Comment from './comment'
import View from './view'

const knexConnection = Knex(connection)

Model.knex(knexConnection)

const models = {
  User,
  Story,
  Comment,
  Reaction,
  View,
}

export default models
