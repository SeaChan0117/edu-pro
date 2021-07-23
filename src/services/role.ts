import request from '@/utils/request'

interface FilterRole {
  name: string
}

interface Role {
  id: string
  name: string
  code: string
  description: string
}
export const getRolesList = (data: FilterRole) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const addOrUpdateRole = (data: Role) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
