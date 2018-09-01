const story = (sequelize, DataTypes) => {
  const Story = sequelize.define('story', {
    title: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    body: {
      type: DataTypes.TEXT,
      validate: { notEmpty: true },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  })

  Story.associate = models => {
    Story.belongsTo(models.User)
    Story.belongsTo(models.Comment)
  }

  return Story
}

export default story
