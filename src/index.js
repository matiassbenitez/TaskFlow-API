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
app.use(express.json())
const allowedOrigins = [
  `http://localhost:${port}`, // desarrollo local
  process.env.CORS_ORIGIN  // dominio frontend en producción (desde .env)
]

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir llamadas desde herramientas como Postman (sin origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Origen no permitido por CORS'))
    }
  },
  credentials: true // Si usás cookies o autenticación
}
app.use(cors(corsOptions))
app.use(helmet())
app.use(requestLogger)
app.get('/', (req,res) => {
  res.send('TaskFlow-API is running!')
})
app.get('/health', (req, res) => {
  res.sendStatus(200)
})
app.use('/tasks', taskRoutes)
app.use('/auth', authRoutes)

export default app

export async function initTables() {
  try {
    await userModel.createUserTable()
    await taskModel.createTaskTable()
  } catch (err) {
    console.error("❌ Error al inicializar tablas:", err)
  }
}