exports.up = function createStoriesTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('stories', table => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.text('body', 'longtext').notNullable()
      table.integer('userId').references('users.id')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
    }),
  ])
}

exports.down = function dropStoriesTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('stories')])
}
