import express from 'express'
import authController from '../controllers/authController.js'
import { body } from 'express-validator'

const router = express.Router()

router.post('/register', 
  [
    body('email').isEmail().withMessage('Innvalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], 
  authController.registerUser
)

router.post('/login', 
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
  ], 
  authController.loginUser
)

export default router