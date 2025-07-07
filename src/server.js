import app, { initTables } from './index.js'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000


initTables().then(() => {
  app.listen(port, () => {
    console.log(`TaskFlow-API corriendo en http://localhost:${port}`)
  })
}).catch((err) => {
  console.error("❌ No se pudo iniciar el servidor:", err)
})