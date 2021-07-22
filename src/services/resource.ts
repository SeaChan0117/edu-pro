import request from '@/utils/request'

interface ResourceFilter {
  name: string
  url: string
  categoryId: number | string
  current: number
  size: number
}

interface Resource {
  name: string
  url: string
  categoryId: number | string
  description: string
}

interface Category {
  id: number | string
  name: string
  sort: number | string
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

export const saveOrUpdateResource = (data: Resource) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

export const delResource = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

export const saveOrderUpdateCate = (data: Category) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

export const delCategory = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
