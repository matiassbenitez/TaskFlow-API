import db from '../db.js'

const createTaskTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS task (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      done BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating tasks table:', err)
    } else {
      console.log('Tasks table created or already exists')
    }
  })
}

export default createTaskTable