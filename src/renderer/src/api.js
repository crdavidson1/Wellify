import axios from "axios"

const getCustomers = (sortBy, order) => {
  return axios.get(`http://localhost:9090/customers`).then((data) => {
    return data
  })
}

export { getCustomers }