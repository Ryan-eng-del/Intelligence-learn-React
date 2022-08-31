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

// 添加课程
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
