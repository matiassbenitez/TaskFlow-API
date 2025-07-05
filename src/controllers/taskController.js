import pool from '../config/db.js'
import taskModel from '../models/taskModel.js'

const taskController ={
  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskModel.getAllTasks()
      res.json(tasks)
    } catch (err) {
      console.error('Error fetching tasks:', err)
      res.status(500).json({ error: 'internal server error' })
    }
  },

  getTaskById: async (req, res) => {
    try {
      const { id } = req.params
      const task = await taskModel.getTaskById(id)
      res.json(task)
    } catch (err) {
      console.error('Error fetching task:', err)
      res.status(500).json({ error: 'internal server error' })
    }
  },
  
  createTask: (req, res) => {
    const { title, description } = req.body
    const sql = 'INSERT INTO task (title, description) VALUES (?, ?)'
    pool.query(sql, [title, description], (err, result) => {
      if (err) {
        console.error('Error creating task:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      res.status(201).json({ id: result.insertId, title, description })
    })
  },

  updateTask: (req, res) => {
    const { id } = req.params
    const { title, description, done } = req.body
    const sql = 'UPDATE task SET title = ?, description = ?, done = ? WHERE id = ?'
    pool.query(sql, [title, description, done, id], (err, result) => {
      if (err) {
        console.error('Error updating task:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' })
      }
      res.json({ id, title, description, done })
    })
  },

  deleteTask: (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM task WHERE id = ?'
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting task:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' })
      }
      res.status(204).send()
    })
  }
}

export default taskController