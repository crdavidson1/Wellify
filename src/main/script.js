const activeWindow = require('active-win')


async function getActiveWindow() {
    const window = await activeWindow()
    return window
}

export default getActiveWindow
