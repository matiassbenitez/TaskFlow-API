import app from '../index.js'
import request from 'supertest'
import pool from '../config/db.js'

describe( 'POST /auth/login', () => {
  
  beforeAll(async () => {
    // First, register a user to test login
    await request(app)
    .post('/auth/register')
    .send({
      username: 'testloginuser', 
      password: 'testloginpassword',
      email: 'testlogin@test.com'
    })
  })
  
  it('should login an existing user', async () => {
    // Now, attempt to login with the registered user
    const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'testlogin@test.com',
      password: 'testloginpassword'
    })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user')
  })
  it(' should not login with invalid credentials', async () => {
    const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'testlogin@test.com',
      password: 'wrongpassword'
    })
    expect(res.statusCode).toBe(401)
    expect(res.body).toHaveProperty('error', 'Invalid email or password')
  })
})