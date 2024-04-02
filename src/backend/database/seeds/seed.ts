// import { Pool } from 'mysql2/promise'
import connect from '../connection'

const seed = async (data: any): Promise<void> => {
  return connect().then(async ({ db, close }) => {
    const tableTitles: Array<String> = ['activity', 'emotions', 'events', 'look', 'move_failures', 'pauses', 'sessions', 'slouches', 'users'];

    for (const title of tableTitles) {
      await db.query(`DROP TABLE IF EXISTS ${title}`)
    }

    await db.query(`CREATE TABLE activity (
    activity_id SERIAL PRIMARY KEY,
    app_name VARCHAR(15)
  );`)

    await db.query(`CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR (50),
    password VARCHAR (20),
    name VARCHAR (20),
    email VARCHAR (50)
  );`)

    await db.query(`CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    session_start TIMESTAMP,
    session_end TIMESTAMP,
    user_id INT REFERENCES users(user_id)
  );`)

    await db.query(`CREATE TABLE move_failures (
    move_failure_id SERIAL PRIMARY KEY,
    time TIMESTAMP,
    session_id INT REFERENCES sessions(session_id)
  );`)

    await db.query(`CREATE TABLE slouches (
    slouch_id SERIAL PRIMARY KEY
  );`)

    await db.query(`CREATE TABLE emotions (
    log_id INT,
    angry FLOAT,
    disgust FLOAT,
    fear FLOAT,
    happy FLOAT,
    sad FLOAT,
    surprise FLOAT,
    neutral FLOAT,
    time TIMESTAMP PRIMARY KEY,
    session_id INT
  )`)

    async function insert(query: String, params: Array<String>): Promise<void> {
      await db.execute(query, params)
    }

    data.userData.forEach(({ username, password, name, email }) => {
      insert(`INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?);`, [username, password, name, email])
    })

    data.activityData.forEach(({ appName }) => {
      insert(`INSERT INTO activity (app_name) VALUES (?)`, [appName])
    })

    data.emotionData.forEach(({ log_id, angry, disgust, fear, happy, sad, surprise, neutral, time, session_id }) => {
      insert(`INSERT INTO emotions (log_id, angry, disgust, fear, happy, sad, surprise, neutral, time, session_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [log_id, angry, disgust, fear, happy, sad, surprise, neutral, new Date(time), session_id])
    })
    return close
  })
  .then((close) => {
    close()
  })

  // interface User {
  //   userId: number
  //   username: string
  //   password: string
  //   name: string
  //   email: string
  // }

  // interface Session {
  //   sessionStart: Date
  //   sessionEnd: Date
  //   userID: number
  // }

  // interface Event {
  //   eventStart: Date
  //   eventEnd: Date
  //   totalTime: number
  //   sessionId: number
  // }
  // interface Slouch extends Event {
  //   slouchId: number
  // }
  // interface Look extends Event {
  //   lookId: number
  // }
  // interface Pause extends Event {
  //   pauseId: number
  // }
  // interface Activity extends Event {
  //   activityId: number
  //   appName: string
  // }

  // interface MoveFailure {
  //   moveFailureId: number
  //   time: Date
  //   sessionId: number
  // }

  // interface Emotion {
  //   emotionId: number
  //   emotionName: string
  //   time: Date
  //   sessionId: number
  // }

}
export default seed
