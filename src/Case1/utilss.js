import axios from "axios";

const usersURL = "https://jsonplaceholder.typicode.com/users";
const postsURL = "https://jsonplaceholder.typicode.com/posts";
const todosURL = "https://jsonplaceholder.typicode.com/todos";

const getAll = (url) => axios.get(url);


const getById = (url, id) => {
    if (id !== undefined) {
        return axios.get(`${url}/${id}`);

    } else {
        return
    }


   


}

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);


const getUsersIDs = async () => {
    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    // console.log(data.id)
    return resp.data.splice(0, 10).map(x => x.id);
}

const getUser = async (id) => {
    let { data } = await axios.get("https://jsonplaceholder.typicode.com/users/" + id);
    // console.log(data)
    return data

}


const getAlltasks = async () => {
    let { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log(data)
    return data

}

const getItemById = async (url, id) => {
    const { data } = await axios.get(`${url}?userId=${id}`)

    return data.splice(0, 5)
}

export default { getAlltasks, getAll, getById, addItem, updateItem, deleteItem, getUsersIDs, getUser, getItemById };
