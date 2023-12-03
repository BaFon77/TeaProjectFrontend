import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8084/auth';

export const axiosInstance = axios.create({})