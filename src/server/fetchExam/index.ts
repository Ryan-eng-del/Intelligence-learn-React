import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { QuestionData } from './types'
import { message } from 'antd'

//添加试题
export const useCreateQuestion = (QuestionItem: QuestionData) => {
  return useMutation(
    async () => {
      await delayFetch()
      return client.post({
        url: 'question/add-question',
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
      url: 'question/list-question/1'
    })
  })
}
