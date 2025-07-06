import userModel from '../models/userModel.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authController = {
  registerUser: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      // Check if user already exists
      const existingUser = await userModel.getUserByEmail(email)
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' })
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create new user
      const newUser = await userModel.createUser(email, hashedPassword)
      res.status(201).json({ id: newUser.id, email: newUser.email })
    } catch (err) {
      console.error('Error registering user:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  loginUser: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      // Fetch user by email
      const user = await userModel.getUserByEmail(email)
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }
      // User authenticated successfully
      // Return user data (excluding password)
      const { id, email: userEmail } = user

      const payload = {
        id,
        email: userEmail
      }

      const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '15m' }
      )

      res.json({token, user: { id, email: userEmail }})
    } catch (err) {
      console.error('Error logging in user:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default authController
