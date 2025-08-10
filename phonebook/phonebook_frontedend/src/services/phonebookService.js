import axios from 'axios'
// 如果一dist文件夹和后段在一起，那么要用相对路径
const baseUrl = '/api/persons'
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