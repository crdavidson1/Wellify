const testData = require('../data/testData/index') 
import seed from './seed'
import pool from '../connection'

const runSeed = (): void => {
  try {
    seed(testData)
  }
  catch (error) {
    console.error(error)
  }
}

runSeed()
