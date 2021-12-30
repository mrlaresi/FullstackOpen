import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
	const response = await axios(baseUrl)
	return response.data
}

const exported = {
	getAll
}

export default exported