import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { QuestionData } from './type'
import { message } from 'antd'

//添加试题
export const useCreateQuestion = (QuestionItem: QuestionData) => {
  // const queryClient = useQueryClient()
  return useMutation(
    async () => {
      await delayFetch()
      return client.post({
        url: 'question/add-question', //url有问题，后面再改
        data: {
          ...QuestionItem
        }
      })
    },
    {
      onSuccess: () => {
        message.success('添加成功')
      },
      onError: () => {
        message.error('添加失败')
      }
    }
  )
}

//展示题目
export const useShowCreateQuestion = () => {
  return useQuery(['exam'], async () => {
    await delayFetch()
    return client.get<any>({
      url: '18825710' //url有问题，后面再改
    })
  })
}
