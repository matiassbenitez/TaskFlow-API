import express from 'express'
import taskController from '../controllers/taskController.js'
import { body } from 'express-validator'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', 
  taskController.getAllTasks)

router.get('/:id', 
  taskController.getTaskById)

router.post('/', 
  [body('title').isLength({ min:3}).withMessage("The title must be more than 3 caracters"), 
  body('done').optional().isBoolean().withMessage("This field must be boolean")],
  taskController.createTask)

router.put('/:id',  
  [body('title').isLength({ min:3}).withMessage("The title must be more than 3 caracters"), 
  body('done').optional().isBoolean().withMessage("This field must be boolean")], taskController.updateTask)

router.delete('/:id', 
  taskController.deleteTask)

export default router
