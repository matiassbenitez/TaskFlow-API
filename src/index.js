import express from 'express'
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes.js'
import taskModel from './models/taskModel.js'
import requestLogger from './middleware/logger.js'
import cors from 'cors'
import helmet from 'helmet'

const app = express()
dotenv.config()

const port = process.env.PORT
taskModel.createTaskTable()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(requestLogger)
app.get('/', (req,res) => {
  res.send('Hello World!')
})
app.use('/tasks', taskRoutes)

app.listen(port, () => {
  console.log(`TaskFlow-API listening at http://localhost:${port}`)
})