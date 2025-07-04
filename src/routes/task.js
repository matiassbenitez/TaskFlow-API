import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/', (req,res) => {
  const sql = 'SELECT * FROM task'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    res.json(results)
  })
})

router.post('/', (req, res) => {
  const { title, description } = req.body
  const sql = 'INSERT INTO task (title, description) VALUES (?, ?)'
  db.query(sql, [title, description], (err, result) => { 
    if (err) {
      console.error('Error creating task:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    res.status(201).json({ id: result.insertId, title, description })
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title, description, done } = req.body
  const sql = 'UPDATE task SET title = ?, description = ?, done = ? WHERE id = ?'
  db.query(sql, [title, description, done, id], (err, result) => {
    if (err) {
      console.error('Error updating task:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json({ id, title, description, done })
  })
})
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM task WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.status(204).send()
  })
})
export default router
