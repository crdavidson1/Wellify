import axios from "axios"

const getUsers = () => {
  return axios.get(`http://localhost:9090/users`).then((data) => {
    return data
  })
}

const getEvents = () => {
  return axios.get(`http://localhost:9090/events`).then((data) => {
    console.log(data)
    return data
  })
}

const getUserEvents = (user_id) => {
  return axios.get(`http://localhost:9090/events/${user_id}`).then((data) => {
    console.log(data)
    return data
  })
}

export { getUsers, getEvents, getUserEvents }