import { Model } from 'objection'

class View extends Model {
  static tableName = 'views'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'views.user_id',
        to: 'user.id',
      },
    },
    story: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Story`,
      join: {
        from: 'views.story_id',
        to: 'story.id',
      },
    },
  }
}

export default View
