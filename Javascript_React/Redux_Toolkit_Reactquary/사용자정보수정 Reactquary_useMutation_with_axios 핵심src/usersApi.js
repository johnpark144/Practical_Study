import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001/',
}); 
// npm install -g json-server // json-server로 rest-API 설치
// json-server --watch ./src/db/data.json --port 3001    // restful api 구축 // json-server --watch + 경로 + 몇번 port에 

export const getUsers = () => 
api.get('/users').then(res => res.data);

export const getUser = (id) =>
api.get(`/users/${id}`).then((res) => res.data);

export const updateUser = ({id, ...updatedUser}) =>
api.put(`/users/${id}`, updatedUser).then((res) => res.data);