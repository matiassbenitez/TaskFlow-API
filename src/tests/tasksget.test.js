import app from '../index.js'
import request from 'supertest'
import pool from '../config/db.js'

describe('GET /tasks', () => {

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

  it('should fetch all tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should fetch a single task by ID', async () => {
    // First, create a task to test fetching
    const createRes = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task'
      })
    expect(createRes.statusCode).toBe(201)
    const taskId = createRes.body.id
    // Now, fetch the created task
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('id', taskId)
    expect(res.body).toHaveProperty('title', 'Test Task')
  })

  it('should return 404 for a non-existent task', async () => {
    const res = await request(app)
      .get('/tasks/99999') // Assuming this ID does not exist
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'Task not found')
  })
  
  it('should return 401 for no token provided', async () => {
    const res = await request(app)
      .get('/tasks')
    expect(res.statusCode).toBe(401)
    expect(res.body).toHaveProperty('error', 'No token provided or invalid format')
  })

  it('should return 400 for invalid task ID', async () => {
    const res = await request(app)
      .get('/tasks/invalid-id')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error', 'Invalid task ID')
  })

  it('should return 403 for invalid or expired token', async () => {
    const res = await request(app)
    .get('/tasks')
    .set('Authorization', 'Bearer invalidtoken')
    expect(res.statusCode).toBe(403)
    expect(res.body).toHaveProperty('error', 'Invalid or expired token')
  })
  
})