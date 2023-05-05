import axios from "axios";
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
    console.log('token:');
    console.log(token);
}

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
}

const update = async (id, newBlog) => {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog);
    return response.data;
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    } 
    await axios.delete(`${baseUrl}/${id}`, config);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, update, remove, setToken};