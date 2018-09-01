const story = (sequelize, DataTypes) => {
  const Story = sequelize.define('story', {
    title: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    body: {
      type: DataTypes.TEXT('long'),
      validate: { notEmpty: true },
    },
  })

  Story.associate = models => {
    Story.belongsTo(models.User)
  }

  return Story
}

export default story
