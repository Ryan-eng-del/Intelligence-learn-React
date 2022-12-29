import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { CourseList } from './types'

// 显示课程
export const useShowCreateClass = () => {
  return useQuery(
    ['teachclass'],
    async () => {
      return client.get<CourseList[]>({
        url: '/course/show-create'
      })
    },
    {
      onSuccess: (data) => {
        console.log(data, 'data')
      },
      onError: (err) => {
        console.log(err, 'err')
      }
    }
  )
}

//显示我学的课程
export const useShowLearnClass = () => {
  return useQuery(['learnclass'], async () => {
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

//加入此班级（课程）
export const useJoinInvitedCourse = () => {
  return useMutation((classId: string) => {
    return client.post<CourseList>({
      url: '/class/join',
      params: { classId }
    })
  },{
    onMutate() {
      useQueryClient().invalidateQueries(['learnclass'])
    },
  })
}

// 添加课程
export const useCreateClass = ({ course_cover, course_name }: { course_name: string; course_cover: string | null }) => {
  const queryClient = useQueryClient()
  console.log(course_name, 'name')
  return useMutation(
    async () => {
            return client.post({
        url: '/course/create',
        data: { course_cover, course_name }
      })
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teachclass'])
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

//删除此课程
export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (courseId: string) => {
      return client.delete({
        url: `/course/delete/${courseId}`
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teachclass'])
      }
    }
  )
}

//修改课程信息
export const useEditCourse = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (data: CourseList) => {
      return client.put({
        url: '/course/update',
        data
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teachclass'])
      }
    }
  )
}
