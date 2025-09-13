import axios from 'axios'
// in production we should make it dynamic
const BASE_URL = import.meta.env.MODE === "development"? "http://localhost:5200/api":"/api"
const api = axios.create({
    baseURL:BASE_URL,
})
export default api;