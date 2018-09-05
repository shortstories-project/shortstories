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
  })

  Story.associate = models => {
    Story.belongsTo(models.User)
    Story.hasMany(models.Comment)
    Story.hasMany(models.Reaction)
    Story.hasMany(models.View)
  }

  return Story
}

export default story
