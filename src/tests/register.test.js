import app from '../index.js'
import request from 'supertest'
import pool from '../config/db.js'

describe( 'POST /auth/register', () => {
  beforeAll(async () => {
    // Clear the users table before running tests
    await pool.query('DELETE FROM user WHERE email = ?', ['testemail@test.com'])
  })

  afterAll(async () => {
    await pool.query('DELETE FROM user WHERE email = ?', ['testemail@test.com'])
    // Close the database connection after tests
    await pool.end()
  })

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        email: 'testemail@test.com'
      })
      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('email', 'testemail@test.com')
  })
  it('should not register a user with an existing email', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        email: 'testemail@test.com'
      })
      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty('error', 'User already exists')
    })
})
