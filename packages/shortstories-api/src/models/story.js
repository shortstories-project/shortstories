const story = (sequelize, DataTypes) => {
  const Story = sequelize.define('story', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    body: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
        len: [600, 4000],
      },
    },
  })

  Story.associate = models => {
    Story.belongsTo(models.User)
    Story.hasMany(models.Comment)
    Story.hasMany(models.Like)
    Story.hasMany(models.Dislike)
    Story.hasMany(models.View)
  }

  return Story
}

export default story
