import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const createPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)
}

export default
    {
        getAll,
        deletePerson,
        createPerson,
        updatePerson
    };