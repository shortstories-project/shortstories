import { expect } from 'chai'
import knex from 'knex'
import connection from '../../../knexfile'
import * as api from './api'

const knexConnection = knex(connection.test)

describe('User', () => {
  before(async () => {
    await knexConnection.migrate.rollback().then(() => {
      knexConnection.migrate.latest()
    })
  })

  after(() => knexConnection.migrate.rollback())

  describe('signUp', () => {
    it('register new user', async () => {
      const expectedResult = {
        data: {
          signUp: {
            id: '1',
            username: 'Test User',
            email: 'test@test.test',
            isVerified: false,
          },
        },
      }
      const { data } = await api.signUp({
        username: 'Test User',
        email: 'test@test.test',
        password: '12345678',
      })
      expect(data).to.eql(expectedResult)
    })
  })

  describe('signIn', () => {
    it('login by created user', async () => {
      const expectedResult = {
        data: {
          signIn: { id: '1', username: 'Test User', email: 'test@test.test' },
        },
      }
      const byEmail = await api.signIn({
        login: 'test@test.test',
        password: '12345678',
      })
      const byUsername = await api.signIn({
        login: 'Test User',
        password: '12345678',
      })
      expect(byEmail.data).to.eql(expectedResult)
      expect(byUsername.data).to.eql(expectedResult)
    })
  })
})
