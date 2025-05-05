import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default Api