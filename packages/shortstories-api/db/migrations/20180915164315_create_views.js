exports.up = function createViewsTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('views', table => {
      table.increments('id').primary()
      table.integer('user_id').references('users.id')
      table.integer('story_id').references('stories.id')
      table.timestamps()
    }),
  ])
}

exports.down = function dropViewsTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('views')])
}
