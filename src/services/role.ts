import request from '@/utils/request'

interface FilterRole {
  name: string
}
export const getRolesList = (data: FilterRole) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
