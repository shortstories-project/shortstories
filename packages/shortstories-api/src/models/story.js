import { Model } from 'objection'

class Story extends Model {
  static tableName = 'stories'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'stories.userId',
        to: 'users.id',
      },
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Comment`,
      join: {
        from: 'stories.id',
        to: 'comments.storyId',
      },
    },
    reactions: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Reaction`,
      join: {
        from: 'stories.id',
        to: 'reactions.storyId',
      },
    },
    views: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/View`,
      join: {
        from: 'stories.id',
        to: 'views.storyId',
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

export default Story
