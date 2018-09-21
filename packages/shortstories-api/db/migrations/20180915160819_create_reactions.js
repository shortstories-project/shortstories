exports.up = function createReactionsTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('reactions', table => {
      table.increments('id').primary()
      table.enu('state', ['like', 'dislike'])
      table.integer('userId').references('users.id')
      table.integer('storyId').references('stories.id')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
    }),
  ])
}

exports.down = function dropReactionsTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('reactions')])
}
