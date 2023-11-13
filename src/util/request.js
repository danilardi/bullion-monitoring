import axios from 'axios'
import { useAuthStore } from "@/stores/auth";

// create axios
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // api base_url
    timeout: 50000, // timeout,
    headers: { 'Access-Control-Allow-Origin': '*' },
})

const err = (error) => {
    console.log('error', error)
    const { status, data } = error.response
    const { errors } = data
    let message = []
    for (let field in errors) {
        message.push(errors[field])
    }
    console.log(data)
    switch (status) {
        case 400:
            console.log(data.message)
            break
        case 422:
            console.log(message)
            break
        case 401:
            console.log(data.message)
            break
        case 403:
            console.log(message)
            break
        case 500:
            console.log('server error')
            break
        default:
            break
    }
    return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = 'Bearer ' + useAuthStore().getAccessToken

    return config
}, err)

// response interceptor
service.interceptors.response.use(({ data, config }) => {
    if (['put', 'post', 'delete', 'patch'].includes(config.method) && data.meta) {
        console.log(data.meta.message)
    }

    return data
}, err)

export default service