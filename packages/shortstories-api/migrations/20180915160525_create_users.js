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
      table.string('photo').defaultTo('/img/assets/default.jpg')
      table.timestamps()
    }),
  ])
}

exports.down = function dropUsersTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users')])
}
