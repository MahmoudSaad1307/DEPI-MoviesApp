import axios from 'axios';
import {API_URL} from '../constants/constants'


const api = axios.create({
  baseURL: API_URL,
});


export const registerUser = (name, email, password) => {
  return api.post('/users/register', { name, email, password });
};

export const loginUser = (email, password) => {
  return api.post('/users/login', { email, password });
};


