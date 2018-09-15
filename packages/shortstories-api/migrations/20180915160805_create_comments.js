exports.up = function createCommentsTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', table => {
      table.increments('id').primary()
      table.string('body').notNullable()
      table.integer('user_id').references('users.id')
      table.integer('story_id').references('stories.id')
      table.timestamps().defaultTo(knex.fn.now())
    }),
  ])
}

exports.down = function dropCommentsTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('comments')])
}
