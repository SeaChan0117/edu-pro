import request from '@/utils/request'

export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}

export const getAllAdSpace = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

export const saveOrUpdateAd = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

export const updateAdStatus = (id: any, status: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params: {
      id,
      status
    }
  })
}

export const getAdById = (id: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}
