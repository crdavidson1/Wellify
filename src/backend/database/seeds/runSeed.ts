import devData from '../data/devData/index'
import seed from './seed'
import pool from '../connection'

const runSeed = async (): Promise<void> => {
  try {
    await seed(devData)
  } catch (error) {
    console.error(error)
  } finally {
    await pool.end()
  }
}

runSeed()
