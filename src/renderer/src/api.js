import axios from 'axios'

const getUsers = () => {
  return axios.get(`http://localhost:9090/users`).then((data) => {
    return data
  })
}

const getEvents = () => {
  return axios.get(`http://localhost:9090/events/posture`).then((data) => {
    return data
  })
}

const getUserPostureEvents = (user_id) => {
  return axios.get(`http://localhost:9090/events/posture/${user_id}`).then((data) => {
    return data
  })
}

const getUserEmotionEvents = (user_id) => {
  return axios.get(`http://localhost:9090/events/emotion/${user_id}`).then((data) => {
    return data
  })
}


export { getUsers, getEvents, getUserPostureEvents, getUserEmotionEvents }
