import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

let isRefreshing = false // 控制 token 刷新状态
let lefReqs: any = [] // 存储刷新 token 时发过来的请求

function redirectToLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

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
request.interceptors.response.use(response => {
  // 状态码 2 开头都会进入成功
  return response
}, async error => {
  // 状态码不是 2 开头
  if (error.response) {
    // 请求发出收到响应
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误！')
    } else if (status === 401) {
      // 如果有 refresh_token，则尝试使用 refresh_token 去获取新的 access_token
      if (!store.state.user) {
        redirectToLogin()
        return Promise.reject(error)
      }

      if (!isRefreshing) {
        // 尝试刷新获取新的 token
        isRefreshing = true
        return refreshToken().then(_ => {
          if (!_.data.success) {
            throw new Error('刷新 Token 失败！')
          }
          // 成功
          // 把 lefReqs 中的请求重新发起
          lefReqs.forEach((cb: () => any) => cb())
          lefReqs = []
          store.commit('setUser', _.data.content)
          // 把本次的请求重新发送
          return request(error.config)
        }).catch(() => {
          // 失败
          store.commit('setUser', null)
          redirectToLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }

      // 刷新 token 时的请求挂起
      return new Promise(resolve => {
        lefReqs.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员！')
    } else if (status === 404) {
      Message.error('请求资源不存在！')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员！')
    }
  } else if (error.request) {
    // 请求发出未收到响应
    Message.error('请求超时，请刷新重试！')
  } else {
    // 设置请求时出错
    Message.error(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})

export default request
