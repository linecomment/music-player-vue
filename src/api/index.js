import axios from 'axios'
import { getToken,setToken,removeToken } from '@/api/token';
import store from '@/store';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5 * 1000
})

api.interceptors.request.use((config) => {
    let token;
    if(store.state.token){
        token = getToken()
    }
    if (token && config.url !== '/user/login' && config.url !== '/user/register' && config.url!=='/mail/sendEmail') {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use((res) => {
    console.log('interceptors res : ',res)
    return res.data
}, (error) => {
    return Promise.reject(error)
})

export default api