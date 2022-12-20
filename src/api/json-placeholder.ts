import Axios, { AxiosResponse } from 'axios';

import { ToDo } from '../models/ToDo';

const api = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});

export const getToDos = (): Promise<AxiosResponse<ToDo[]>> => api.get(`/todos`);
export const createToDo = (body: ToDo): Promise<AxiosResponse<ToDo>> => api.post(`/todos`, body);
export const updateToDo = (id: number, body: ToDo): Promise<AxiosResponse<ToDo>> => api.patch(`/todos/${id}`, body);
export const deleteToDo = (id: number) => api.delete(`/todos/${id}`);
