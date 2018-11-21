const reaction = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('reaction', {
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  Reaction.associate = models => {
    Reaction.belongsTo(models.User)
    Reaction.belongsTo(models.Story)
  }

  return Reaction
}

export default reaction
