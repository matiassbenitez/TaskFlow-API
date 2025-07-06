import taskModel from '../models/taskModel.js'
import { validationResult } from 'express-validator'

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
  
  createTask: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()})
    }
    
    const {title, description } = req.body
    try {
      const newTask = await taskModel.createTask(title, description)
      res.status(201).json(newTask)
    } catch (err) {
      console.error('Error creating task:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  updateTask: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()})
    }
    
    const { id } = req.params
    const { title, description, done } = req.body
    try {
      const updatedTask = await taskModel.updateTask(id, title, description, done)
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' })
      }
      res.json(updatedTask)
    }catch (err) {
      console.error('Error updating task:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.params
    try {
      const deletedTask = await taskModel.deleteTask(id)
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' })
      }
      res.json({ message: 'Task deleted successfully' })
    } catch (err) {
      console.error('Error deleting task:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default taskController