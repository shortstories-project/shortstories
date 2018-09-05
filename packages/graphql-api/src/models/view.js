const view = (sequelize, DataTypes) => {
  const View = sequelize.define('view', {
    hasViewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  View.associate = models => {
    View.belongsTo(models.User)
    View.belongsTo(models.Story)
  }

  return View
}

export default view
