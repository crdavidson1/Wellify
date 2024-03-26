import { createPool, Pool } from 'mysql2/promise'
// import { dotenv } from 'dotenv'

// dotenv.config()

const databaseName: string = process.env.NODE_ENV === 'test' ? 'wellify_test' : 'wellify_db'

const pool: Pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: databaseName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
