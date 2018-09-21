exports.up = function createCommentsTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', table => {
      table.increments('id').primary()
      table.string('body').notNullable()
      table.integer('userId').references('users.id')
      table.integer('storyId').references('stories.id')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
    }),
  ])
}

exports.down = function dropCommentsTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('comments')])
}
