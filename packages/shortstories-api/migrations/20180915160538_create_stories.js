exports.up = function createStoriesTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('stories', table => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.text('body', 'longtext').notNullable()
      table.integer('user_id').references('users.id')
      table.timestamps()
    }),
  ])
}

exports.down = function dropStoriesTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('stories')])
}
