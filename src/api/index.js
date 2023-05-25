import axios from 'axios'

const $https = axios.create({
    baseURL: '/api',
    timeout: 10 * 1000
})

$https.interceptors.request.use((config) => {
    return config
})

$https.interceptors.response.use((res) => {
    return res.data
}, (error) => {
    return Promise.reject(new error('failed'))
})

export default $https