import pool from '../config/db.js'

const userModel = {
  createUserTable: async () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    try {
      await pool.query(sql)
      console.log('User table created successfully')
    } catch (err) {
      console.error('Error creating user table:', err)
      throw new Error('Internal Server Error')
    }
  },
  createUser: async (email, password) => {
    const sql = 'INSERT INTO user (email, password) VALUES (?, ?)'
    try {
      const [result] = await pool.query(sql, [email, password])
      return { id: result.insertId, email }
    } catch (err) {
      console.error('Error creating user:', err)
      throw new Error('Internal Server Error')
    }
  },
  getUserByEmail: async (email) => {
    const sql = 'SELECT * FROM user WHERE email = ?'
    try {
      const [results] = await pool.query(sql, [email])
      return results.length > 0 ? results[0] : null
    } catch (err) {
      console.error('Error fetching user:', err)
      throw new Error('Internal Server Error')
    }
  },
  updateUser: async (id, email, password) => {
    const sql = 'UPDATE user SET email = ?, password = ? WHERE id = ?'
    try {
      const [result] = await pool.query(sql, [email, password, id])
      if (result.affectedRows === 0) {
        throw new Error('User not found')
      }
      return { id, email }
    } catch (err) {
      console.error('Error updating user:', err)
      throw new Error('Internal Server Error')
    }
  },
}

export default userModel