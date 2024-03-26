// import { Pool } from 'mysql2/promise'
import pool from '../connection'

const seed = async (data: any): Promise<number> => {
  console.log('success')
  console.log(data)
  interface User {
    userId: number
    username: string
    password: string
    name: string
    email: string
  }

  interface Session {
    sessionStart: Date
    sessionEnd: Date
    userID: number
  }

  interface Event {
    eventStart: Date
    eventEnd: Date
    totalTime: number
    sessionId: number
  }
  interface Slouch extends Event {
    slouchId: number
  }
  interface Look extends Event {
    lookId: number
  }
  interface Pause extends Event {
    pauseId: number
  }
  interface Activity extends Event {
    activityId: number
    appName: string
  }

  interface MoveFailure {
    moveFailureId: number
    time: Date
    sessionId: number
  }

  interface Emotion {
    emotionId: number
    emotionName: string
    time: Date
    sessionId: number
  }

  await pool.query('DROP TABLE IF EXISTS slouch')
  await pool.query('CREATE TABLE slouch (slouchId INT AUTO_INCREMENT PRIMARY KEY')

  return 1
}
export default seed
