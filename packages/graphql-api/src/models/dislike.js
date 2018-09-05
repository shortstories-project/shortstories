const dislike = (sequelize) => {
  const Dislike = sequelize.define('dislike')

  Dislike.associate = models => {
    Dislike.belongsTo(models.User)
    Dislike.belongsTo(models.Story)
  }

  return Dislike
}

export default dislike
