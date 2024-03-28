const testData = require('../data/testData/index')
import seed from './seed'

const runSeed = async (): Promise<void> => {
  try {
    await seed(testData)
  } catch (error) {
    console.error(error)
  }
}

runSeed()
