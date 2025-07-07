import app from './index.js'
import dotenv from 'dotenv'
import taskModel from './models/taskModel.js'
import userModel from './models/userModel.js'

dotenv.config()

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await userModel.createUserTable()
    await taskModel.createTaskTable()

    app.listen(PORT, () => {
      console.log(`🚀 TaskFlow-API corriendo en http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('❌ Error iniciando el servidor:', err)
    process.exit(1)
  }
}

startServer()