exports.up = function createReactionsTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('reactions', table => {
      table.increments('id').primary()
      table.enu('state', ['like', 'dislike'])
      table.integer('user_id').references('users.id')
      table.integer('story_id').references('stories.id')
      table.timestamps().defaultTo(knex.fn.now())
    }),
  ])
}

exports.down = function dropReactionsTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('reactions')])
}
