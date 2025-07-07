import express from 'express'
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes.js'
import authRoutes from './routes/authRoutes.js'
import taskModel from './models/taskModel.js'
import userModel from './models/userModel.js'
import requestLogger from './middleware/loggerMiddleware.js'
import cors from 'cors'
import helmet from 'helmet'

const app = express()
dotenv.config()

const port = process.env.PORT
taskModel.createTaskTable()
userModel.createUserTable()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(requestLogger)
app.get('/', (req,res) => {
  res.send('Hello World!')
})
app.use('/tasks', taskRoutes)
app.use('/auth', authRoutes)

export default app