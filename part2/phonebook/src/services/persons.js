import axios from 'axios'
const baseURL = "/api/persons"

const getPersons = () => {
  return axios.get(baseURL)
}

const addPerson = (person) => {
  return axios.post(baseURL, person)
}

const modifyNumber = (personId, number) => {
  return axios.put(`${baseURL}/${personId}`, number)
}

const deletePerson = (personId) => {
  return axios.delete(`${baseURL}/${personId}`)
}

const axiosHandler = {
  getPersons,
  addPerson,
  modifyNumber,
  deletePerson
}
export default axiosHandler