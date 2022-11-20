import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { CourseList } from './types'

// 显示课程
export const useShowCreateClass = () => {
  return useQuery(['teachclass'], async () => {
    await delayFetch()
    return client.get<CourseList[]>({
      url: '/course/show-create'
    })
  })
}

//显示我学的课程
export const useShowLearnClass = () => {
  return useQuery(['learnclass'], async () => {
    await delayFetch()
    return client.get<CourseList[]>({
      url: '/course/show-join'
    })
  })
}

//显示邀请码班级信息
export const useShowInvitedCourseInfo = () => {
  return useMutation(async (class_invitation_code: string) => {
    return await client.get({
      url: '/class/invitation-code',
      params: { classInvitationCode: class_invitation_code }
    })
  })
}

export const useJoinInvitedCourse = () => {
  return useMutation((classId: string) => {
    console.log('idid', classId)
    return client.post<CourseList>({
      url: '/class/join',
      params: { classId }
    })
  })
}

// 添加课程
export const useCreateClass = ({ course_cover, course_name }: { course_name: string; course_cover: string | null }) => {
  const queryClient = useQueryClient()
  return useMutation(
    async () => {
      await delayFetch()
      return client.post({
        url: '/course/create',
        data: { course_cover, course_name }
      })
    },

    {
      onSuccess: () => {
        message.success('添加课程成功')
        queryClient.invalidateQueries(['learnclass'])
      }
    }
  )
}
/* 获取课程 */
export const useGetCourseInfoById = () => {
  return useMutation(async (courseId: string) => {
    return client.get({ url: '/course/get-one', params: { courseId } })
  })
}
