import mysql from 'mysql2/promise.js'
import dotenv from 'dotenv'

dotenv.config()
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// })
const pool = mysql.createPool(process.env.DB_URI)

export default pool