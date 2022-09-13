import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { ExamListItem, QuestionData } from './types'
import { message } from 'antd'

/** 添加试题 */
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

/** 展示题目 */
export const useShowCreateQuestion = () => {
  return useQuery(['questionbank'], async () => {
    await delayFetch()
    return client.get<any>({
      url: 'question/list-question/1'
    })
  })
}

/** 展示题目详细信息 */
export const useShowQuestionDetails = (id?:string) => {
  return useQuery(['preview'], async () => {
    await delayFetch()
    return client.get<any>({
      url: `/question/show-question/${id || 1}`
    })
  })
}

/** 获取此课程的全部试题 */
export const useShowExamList = (courseID: string) => {
  return useQuery([`ExamList-${courseID}`], async () => {
    await delayFetch()
    return client.get<ExamListItem[]>({
      url: `/paper/show-all`,
      params: {
        courseId:courseID
      }
    })
  })
}