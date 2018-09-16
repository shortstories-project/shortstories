const batchUsers = async (keys, models) => {
  const users = await models.User.query().findByIds(keys)
  return keys.map(key => users.find(user => user.id === key))
}

export default batchUsers
