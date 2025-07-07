import pool from '../config/db.js'

const taskModel ={
  createTaskTable: async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS task (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      done BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
      `
      
    try {
      await pool.query(sql);
      console.log('Tasks table created or already exists');
    } catch (err) {
      console.error('Error creating tasks table:', err);
    }
  },
  
  createTask: async (title, description) => {
    const sql = 'INSERT INTO task (title, description) VALUES (?, ?)'
    try {
      const [result] = await pool.query(sql, [title, description])
      return { id: result.insertId, title, description }
    } catch (err) {
      console.error('Error creating task:', err)
      throw new Error('Internal Server Error')
    }
  },
  
  getAllTasks: async () => {
    const sql = 'SELECT * FROM task'
    try {
      const [results] = await pool.query(sql)
      return results
    } catch (err) {
      console.error('Error fetching tasks:', err)
      throw new Error('Internal Server Error')
    }
  },
  
  getTaskById: async (id) => {
    const sql = 'SELECT * FROM task WHERE id = ?'
    try {
      const [results] = await pool.query(sql, [id])
      if (results.length === 0) {
        return null
      }
      return results[0]
    } catch (err) {
      console.error('Error fetching task:', err)
      throw new Error('Internal Server Error')
    }
  },

  updateTask: async (id, title, description, done) => {
    const sql = 'UPDATE task SET title = ?, description = ?, done = ? WHERE id = ?'
    try {
      const [result] = await pool.query(sql, [title, description, done, id])
      if (result.affectedRows === 0) {
        throw new Error('Task not found')
      }
      return { id, title, description, done }
    } catch (err) {
      console.error('Error updating task:', err)
      throw new Error('Internal Server Error')
    }
  },

  deleteTask: async (id) => {
    const sql = 'DELETE FROM task WHERE id = ?'
    try {
      const [result] = await pool.query(sql, [id])
      if (result.affectedRows === 0) {
        throw new Error('Task not found')
      }
      return { message: 'Task deleted successfully' }
    } catch (err) {
      console.error('Error deleting task:', err)
      throw new Error('Internal Server Error')
    }
  }
}
    
export default taskModel