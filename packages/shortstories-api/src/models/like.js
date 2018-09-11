const like = (sequelize) => {
  const Like = sequelize.define('like')

  Like.associate = models => {
    Like.belongsTo(models.User)
    Like.belongsTo(models.Story)
  }

  return Like
}

export default like
