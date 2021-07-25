import request from '@/utils/request'

export const pageQueryCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
