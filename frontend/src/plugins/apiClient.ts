import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl)
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
