import { Model } from 'objection'

class Story extends Model {
  static tableName = 'stories'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'stories.user_id',
        to: 'user.id',
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
}

export default Story

// const story = (sequelize, DataTypes) => {
//   const Story = sequelize.define('story', {
//     title: {
//       type: DataTypes.STRING,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     body: {
//       type: DataTypes.TEXT,
//       validate: {
//         notEmpty: true,
//         len: [600, 4000],
//       },
//     },
//   })

//   Story.associate = models => {
//     Story.belongsTo(models.User)
//     Story.hasMany(models.Comment)
//     Story.hasMany(models.Like)
//     Story.hasMany(models.Dislike)
//     Story.hasMany(models.View)
//   }

//   return Story
// }

// export default story
