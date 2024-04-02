const mysql = require('mysql2/promise')
import {Connector, AuthTypes, IpAddressTypes} from '@google-cloud/cloud-sql-connector'
const databaseName: string = process.env.NODE_ENV === 'test' ? 'wellify_test' : 'wellify_db'
process.env.GOOGLE_APPLICATION_CREDENTIALS = '/home/robbob/Downloads/sound-abbey-419112-042182a9fe88.json'

export default async function connect() {
  const connector = new Connector()
  const clientOptions = await connector.getOptions({
    instanceConnectionName: 'sound-abbey-419112:europe-west2:wellify',
    ipType: IpAddressTypes.PUBLIC,
    authType: AuthTypes.PASSWORD
  })
  const pool = await mysql.createPool({
    ...clientOptions,
    user: 'test',
    password: 'test',
    database: 'wellify_test'
  })
  const db = await pool.getConnection()

  return {
    db,
    async close() {
      await pool.end()
      db.close()
    }
  }
}