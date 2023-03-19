import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    console.log(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`);
};

const personsService = {getAll, create, update, remove};

export default personsService;
