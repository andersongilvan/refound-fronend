import axios from "axios";

export const api = axios.create({
    baseURL: 'https://refound-api.onrender.com'
})