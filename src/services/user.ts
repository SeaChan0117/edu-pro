import request from '@/utils/request'
import qs from 'qs'

interface LoginUser {
  phone: string
  password: string
}

// 登录
export const login = (data: LoginUser) => {
  return request({
    method: 'POST',
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded' // qs 会自动转换
    // },
    url: '/front/user/login',
    // 如果 data 是 qs.stringify(data) 处理过的数据，则不用再手动设置 content-type，默认会被转为 application/x-www-form-urlencoded
    // 如果 data 是普通对象，则 content-type 是默认的 application/json
    // 如果 data 是 FormData，则 content-type 是 multipart/form-data
    data: qs.stringify(data) // axios 发送请求，默认是 application/json 格式的数据，我们需要 x-www-form-urlencoded 格式
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

// 退出登录
export const logout = () => {
  return request({
    method: 'POST',
    url: '/front/user/logout'
  })
}

export const getUsers = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

export const forbidUser = (userId: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    data: {
      userId
    }
  })
}
