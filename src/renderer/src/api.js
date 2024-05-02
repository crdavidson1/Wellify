import axios from "axios"

const getCustomers = () => {
  return axios.get(`http://localhost:9090/customers`).then((data) => {
    return data
  })
}

const getEvents = () => {
  return axios.get(`http://localhost:9090/events`).then((data) => {
    console.log(data)
    return data
  })
}

export { getCustomers, getEvents }