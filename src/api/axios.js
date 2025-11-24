import axios from "axios";


const axiosInstance = axios.create({
    // baseURL: 'https://prhouse-social-app-backend.onrender.com/api/v1',
    baseURL: 'https://prhouse-backend.onrender.com/api/v1',
    withCredentials: true,
});


export default axiosInstance;