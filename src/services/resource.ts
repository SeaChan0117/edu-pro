import request from '@/utils/request'

interface ResourceFilter {
  name: string
  url: string
  categoryId: number | string
  current: number
  size: number
}
export const getResourcePages = (data: ResourceFilter) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getAllCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
