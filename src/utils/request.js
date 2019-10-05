import axios from 'axios'
import store from '@/store'
import NProgress from 'nprogress'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })
const request = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    config.headers['token'] = store.state.token
    NProgress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    Message.error({
      message: error.message
    })
    NProgress.done()
    return Promise.reject(error)
  }
)
export default request
