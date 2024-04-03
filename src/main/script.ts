const activeWindow = require('active-win')
import connect from '../backend/database/connection'

export async function getActiveWindow() {
    const window = await activeWindow()
    return window
}

export async function getEmotions () {
    return connect()
    .then(async ({db, close}) => {
        const data = await db.execute(`
        SELECT * FROM emotions;`)
        return {data, close}
    })
    .then(async ({data, close}) => {
        await close()
        return data
    })
}
