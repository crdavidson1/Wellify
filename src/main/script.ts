const activeWindow = require('active-win')
import connect from '../backend/database/connection'

export async function getActiveWindow() {
  const window = await activeWindow()
  return window
}

export async function getEmotions() {
  return connect()
    .then(async ({ db, close }) => {
      const data = await db.execute(`
        SELECT * FROM emotions;`)
      return { data, close }
    })
    .then(async ({ data, close }) => {
      await close()
      return data
    })
}

export async function login(username, password) {
  return connect()
    .then(async ({ db, close }) => {
      const response = await db.execute(`
        SELECT password
        FROM users
        WHERE username = ?`, [username])
      console.log(response, username, password);
      if (response[0][0] && password === response[0][0].password) {
        return { bool: true, close }
      }
      else {
        return { bool: false, close }
      }

    })
    .then(async ({ bool, close }) => {
      await close()
      return bool
    })
}
