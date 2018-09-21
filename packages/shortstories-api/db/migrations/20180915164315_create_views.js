exports.up = function createViewsTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('views', table => {
      table.increments('id').primary()
      table.integer('userId').references('users.id')
      table.integer('storyId').references('stories.id')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
    }),
  ])
}

exports.down = function dropViewsTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('views')])
}
