import { Model } from 'objection'
import bcrypt from 'bcrypt'

const relationMappingHelper = (table, model) => ({
  relation: Model.HasManyRelation,
  modelClass: model,
  join: {
    from: 'users.id',
    to: `${table}.userId`,
  },
})

class User extends Model {
  static tableName = 'users'

  static relationMappings = {
    stories: relationMappingHelper('stories', `${__dirname}/Story`),
    comments: relationMappingHelper('comments', `${__dirname}/Comment`),
    reactions: relationMappingHelper('reactions', `${__dirname}/Reaction`),
    views: relationMappingHelper('views', `${__dirname}/View`),
  }

  static findByLogin = async login => {
    let user = await User.query().findOne({ username: login })
    if (!user) {
      user = await User.query().findOne({ email: login })
    }
    return user
  }

  async $beforeInsert() {
    this.createdAt = new Date().toISOString()
    this.password = await this.generatePasswordHash()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }

  async generatePasswordHash() {
    const saltRounds = 10
    const hash = await bcrypt.hash(this.password, saltRounds)
    return hash
  }
}

User.prototype.validatePassword = async function validatePassword(password) {
  const isValid = await bcrypt.compare(password, this.password)
  return isValid
}

export default User
