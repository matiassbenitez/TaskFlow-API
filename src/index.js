import express from 'express'
import dotenv from 'dotenv'
import db from './db.js'
import taskRoutes from './routes/task.js'
import createTaskTable from './models/taskModel.js'

const app = express()
dotenv.config()

const port = process.env.PORT
createTaskTable()
app.use(express.json())
app.get('/', (req,res) => {
  res.send('Hello World!')
})
app.use('/tasks', taskRoutes)

app.listen(port, () => {
  console.log(`TaskFlow-API listening at http://localhost:${port}`)
})