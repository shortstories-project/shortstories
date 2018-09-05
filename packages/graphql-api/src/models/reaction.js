const reaction = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('reaction', {
    like: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dislike: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  Reaction.associate = models => {
    Reaction.belongsTo(models.User)
    Reaction.belongsTo(models.Story)
  }

  return Reaction
}

export default reaction
