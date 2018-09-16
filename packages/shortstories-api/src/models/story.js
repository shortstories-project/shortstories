import { Model } from 'objection'

class Story extends Model {
  static tableName = 'stories'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'stories.user_id',
        to: 'users.id',
      },
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Comment`,
      join: {
        from: 'stories.id',
        to: 'comments.story_id',
      },
    },
    reactions: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Reaction`,
      join: {
        from: 'stories.id',
        to: 'reactions.story_id',
      },
    },
    views: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/View`,
      join: {
        from: 'stories.id',
        to: 'views.story_id',
      },
    },
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }
}

export default Story
