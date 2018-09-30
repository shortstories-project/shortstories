exports.up = function createUsersTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table
        .string('username')
        .notNullable()
        .unique()
      table
        .string('email')
        .notNullable()
        .unique()
      table.string('password').notNullable()
      table.string('photo')
      table
        .boolean('isVerified')
        .defaultTo(false)
        .notNullable()
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
    }),
  ])
}

exports.down = function dropUsersTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users')])
}
