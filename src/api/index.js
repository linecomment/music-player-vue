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

const excludeUrls = ['/user/login', '/user/register', '/mail/sendEmail']

api.interceptors.request.use((config) => {
    if (config.url !== '/user/login' && config.url !== '/user/register' && config.url !== '/mail/sendEmail') {
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = `${token}`
        }
    }
    // if (excludeUrls.indexOf(config.url) === -1) {
    //     const token = getToken()
    //     if (token) {
    //         config.headers['Authorization'] = `Bearer ${token}`
    //     }
    // } 
    return config
})

api.interceptors.response.use((res) => {
    console.log('interceptors res : ',res)
    if(res.data.code === 40013 ){
        window.location.href = '/login'
    }
    return res.data
}, (error) => {
    return Promise.reject(error)
})

export default api