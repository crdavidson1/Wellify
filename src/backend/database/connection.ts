const mysql = require('mysql2/promise.js')
const config = {}

const databaseName: string = process.env.NODE_ENV === 'test' ? 'wellify_test' : 'wellify_db'

require('dotenv').config({ path: `${__dirname}/../../.env.${databaseName}` })

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: databaseName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool

// const fn = async (): Promise<void> => {
//   const connection = await mysql.createConnection ({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'robbob',
//   password: process.env.DB_PASSWORD || 'robbob',
//   database: databaseName,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
//   })

//   connection.query(`
//     select * from example;
//     `)
//   .then((res) => {
//     console.log(res);

//   })
// }
