import { Model } from 'objection'

class Reaction extends Model {
  static tableName = 'reactions'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'reactions.user_id',
        to: 'user.id',
      },
    },
    story: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Story`,
      join: {
        from: 'reactions.story_id',
        to: 'story.id',
      },
    },
  }
}

export default Reaction
