import { Model } from 'objection'

class Reaction extends Model {
  static tableName = 'reactions'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'reactions.userId',
        to: 'users.id',
      },
    },
    story: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Story`,
      join: {
        from: 'reactions.storyId',
        to: 'stories.id',
      },
    },
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}

export default Reaction
