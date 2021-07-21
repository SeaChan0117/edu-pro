import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 配置选项
  // baseURL: '',
  // timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 统一配置 Authorization
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器

export default request
