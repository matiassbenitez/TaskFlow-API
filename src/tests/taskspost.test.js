import app from '../index.js'
import request from 'supertest'
import pool from '../config/db.js'

describe('POST /tasks', () => {

  let token

  beforeAll(async () => {
    // First, register a user to test login
    await request(app)
    .post('/auth/register')
    .send({
      username: 'testloginuser', 
      password: 'testloginpassword',
      email: 'testlogin@test.com'
    })
    // Now, login to get the token
    const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'testlogin@test.com',
      password: 'testloginpassword'
    })

    token = res.body.token
  })

  afterAll(async () => {
    // Clear the tasks table after tests
    await pool.query('DELETE FROM task WHERE title = ?', ['Test Task'])
    // Clear the user created for testing
    await pool.query('DELETE FROM user WHERE email = ?', ['testlogin@test.com'])
    // Close the database connection after tests
    await pool.end()
  })
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task'
      })
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('title', 'Test Task')
    expect(res.body).toHaveProperty('description', 'This is a test task')
  })
  it('should not create a task without title', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'This task has no title'
      })
    expect(res.statusCode).toBe(400)
    expect(res.body.errors[0]).toHaveProperty('msg', 'The title must be more than 3 caracters')
  })
  it('should not create a task without description', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Task without description'
      })
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error', 'Description is required')
  })
  it('should return 401 for no token provided', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test task'
      })
    expect(res.statusCode).toBe(401)
    expect(res.body).toHaveProperty('error', 'No token provided or invalid format')
  })
  it('should return 403 for invalid or expired token', async () => {
    const res = await request(app)
    .post('/tasks')
    .send({
      title: 'Test Task',
      description: 'This is a test task'
    })
    .set('Authorization', 'Bearer invalidtoken')
    expect(res.statusCode).toBe(403)
    expect(res.body).toHaveProperty('error', 'Invalid or expired token')
  })
})