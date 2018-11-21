const view = sequelize => {
  const View = sequelize.define('view')

  View.associate = models => {
    View.belongsTo(models.User)
    View.belongsTo(models.Story)
  }

  return View
}

export default view
