exports.seed = function createUsers(knex) {
  return knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          id: 1,
          username: 'shashkov0',
          email: 'shashkovdanil@gmail.com',
          password: '$2a$10$mFiPtajlaHZwQFVB2CROV.0jl4p/Cy2Safs6Y3qDssGFt1W1bmhES',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 2,
          username: 'danechka16',
          email: 'danil.31.08@yandex.ru',
          password: '$2a$10$mFiPtajlaHZwQFVB2CROV.0jl4p/Cy2Safs6Y3qDssGFt1W1bmhES',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    )
}
