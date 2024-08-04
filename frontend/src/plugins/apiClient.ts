import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://sistema-de-controle-de-pontos.onrender.com',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
