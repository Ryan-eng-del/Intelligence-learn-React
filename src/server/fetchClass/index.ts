import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
// 显示课程
export const useShowCreateClass = () => {
  return useQuery(['class'], async () => {
    await delayFetch()
    return client.get<any>({
      url: 'course/show-create'
    })
  })
}
//显示我学的课
export const useShowLearnClass = () => {
  return useQuery(['learnclass'], async () => {
    await delayFetch()
    return client.get<any>({
      url: 'course/show-join'
    })
  })
}

// 添加课程(目前不可用)
export const useCreateClass = ({
  course_cover,
  course_name
}: {
  course_name: string
  course_cover: string | null
}) => {
  const queryClient = useQueryClient()
  return useMutation(
    async () => {
      await delayFetch()
      return client.post({
        url: '18796117',
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
      onSettled: () => {
        message.success('添加课程成功')
        queryClient.invalidateQueries(['class'])
      }
    }
  )
}
//加入课程
export const useJoinClass = (invitedcode: string) => {
  const queryClient = useQueryClient()
  let newLearnClass = {}
  return useMutation(
    async () => {
      await delayFetch()
      return client
        .post({
          url: '/course/join-class',
          data: { invitedcode: invitedcode }
        })
        .then((res) => {
          newLearnClass = res
        })
    },
    {
      onMutate: () => {
        const previousLearnClass = queryClient.getQueryData(['learnclass'])
        queryClient.setQueryData(['learnclass'], (old: any) => {
          const newState = [...old].concat({
            course_id: '1547211425930256386',
            course_name: 'loading',
            courses_cover: null,
            course_describe: null,
            optimistic: true
          })
          return newState
        })
        return { previousLearnClass }
      },
      onError: (err, variables, context) => {
        if (context?.previousLearnClass) {
          queryClient.setQueryData(['learnclass'], context.previousLearnClass)
        }
      },
      onSettled: () => {
        message.success('加入课程成功')
        // queryClient.invalidateQueries(['learnclass'])
        queryClient.setQueryData(['learnclass'], (old: any) => {
          old.pop()
          const newState = [...old].concat(newLearnClass)
          return newState
        })
      }
    }
  )
}
