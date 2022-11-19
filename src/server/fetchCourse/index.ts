import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import {  CourseList } from './types'
// 显示课程
export const useShowCreateClass = () => {
  return useQuery(['class'], async () => {
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
export const useShowInvitedCourseInfo = (class_invitation_code: string, setNewCourse: any, setModalVisible2: any) => {
  return useMutation(
    async () => {
      await delayFetch()
      return await client.get<CourseList>({
        url: '/class/invitation-code',
        params: { class_invitation_code }
      })
    },
    {
      onSuccess: (data) => {
        if (data) {
          console.log(data)
          setNewCourse(data)
          setModalVisible2(true)
          message.success('查询成功')
        } else {
          message.error(`不存在的课: ${class_invitation_code}`)
        }
      },
      onError: () => {
        message.error('查询失败')
      }
    }
  )
}

export const useJoinInvitedCourse = (
  class_invitation_code: string,
  newCourse: CourseList
) => {
  const queryClient = useQueryClient()
  return useMutation(
    async () => {
      await delayFetch()
      return client.post<CourseList>({
        url: '/class/join',
        data: { class_invitation_code: class_invitation_code }
      })
    },
    {
      onMutate: () => {
        // const previousLearnCourseList = queryClient.getQueryData<CourseInfo[]>(['learnclass'])
        queryClient.setQueryData(['learnclass'], (old: any) => {
          const newState = [...old].concat({
            course_id: '-1',
            course_name: 'loading',
            courses_cover: null,
            course_describe: null,
            optimistic: true
          })
          return newState
        })
      },
      onSuccess: () => {
        message.success('添加成功')
        queryClient.setQueryData(['learnclass'], (old: any) => {
          old.pop()
          const newState = [...old].concat(newCourse)
          return newState
        })
      },
      onError: () => {
        message.error('添加失败')
      }
    }
  )
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
      onMutate: () => {
        const previousClass = queryClient.getQueryData(['class'])
        queryClient.setQueryData(['class'], (old: any) => {
          const newState = [...old].concat({
            course_id: Date.now(),
            course_name: course_name,
            courses_cover: course_cover,
            course_describe: null,
            optimistic: true
          })
          return newState
        })
        return { previousClass }
      },
      onError: (err, variables, context) => {
        if (context?.previousClass) {
          queryClient.setQueryData(['class'], context.previousClass)
        }
      },
      onSuccess: () => {
        message.success('添加课程成功')
        queryClient.invalidateQueries(['class'])
      }
    }
  )
}

//加入班级
export const useJoinClass = (newCourseId: string) => {
  return useQuery(['joinclass'], () =>
    client.post({
      url: '/class/join',
      data: {
        class_id: newCourseId,
        token: null
      }
    })
  )
}

//通过课程id去获取课程信息
export const useGetClassInfoApi = () => {
  return useMutation((id: string) => {
    return client.get({ url: '', params: id })
  })
}
