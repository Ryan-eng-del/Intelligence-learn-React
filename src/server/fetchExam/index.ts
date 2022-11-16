import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { ExamListItem, QuestionBank, QuestionData, QuestionDataWithID, QuestionType, WholeQuestion } from './types'
import { message } from 'antd'

/** 添加试题 */
export const useCreateQuestion = () => {
  return useMutation(async (QuestionItem: QuestionData) => {
    return client.post({
      url: 'question/teacher/create',
      data: {
        ...QuestionItem
      }
    })
  })
}

/** 显示试题库 */
export const useShowCreateQuestion = (id?: string) => {
  return useQuery(['questionbank'], async () => {
    await delayFetch()
    return client.get<QuestionBank[]>({
      url: 'question/list-question',
      params: {
        courseId: id
      }
    })
  })
}

/** 展示题目详细信息 做展示试题页面 */
export const useShowQuestionDetails = (id?: string) => {
  return useQuery([`preview-${id}`], async () => {
    return client.get<WholeQuestion>({
      url: `/question/show-question`,
      params: {
        questionId: id
      }
    })
  })
}

/** 获取此课程的全部作业 */
export const useShowExamList = (courseID: string) => {
  return useQuery([`ExamList-${courseID}`], async () => {
    await delayFetch()
    return client.get<ExamListItem[]>({
      url: `/paper/show-all`,
      params: {
        courseId: courseID
      }
    })
  })
}

/** 添加空试题 */
export const useCreateEmptyQuestion = () => {
  return useMutation(async (type: QuestionType) => {
    // await delayFetch()
    const defData = {
      questionDescription: '',
      courseId: '',
      pointIds: [],
      questionOption: 'dsadas<>fr<>ads<>dsads',
      questionAnswerExplain: '',
      questionAnswerNum: 1,
      questionDifficulty: 1,
      questionType: type,
      rightAnswer: 'A'
    }
    const qID = client.post<string>({
      url: 'question/add-question',
      data: defData
    })
    return { ...defData, questionId: qID as unknown as string }
  })
}

/** 更新题目 */
export const useUpadateQuestion = () => {
  return useMutation(
    async (QuestionItem: QuestionDataWithID) => {
      await delayFetch()
      return client.post({
        url: '/question/update-question',
        data: {
          ...QuestionItem
        }
      })
    },
    {
      onSuccess: () => {
        message.success('更新成功')
      },
      onError: () => {
        message.error('更新失败')
      }
    }
  )
}

/** 删除试题 */
export const useDeleteQuestion = () => {
  return useMutation(
    async (id: string) => {
      await delayFetch()
      return client.post({
        url: '/question/delete-question',
        data: { id }
      })
    },
    {
      onSuccess: () => {
        message.success('删除成功')
      },
      onError: () => {
        message.error('删除失败')
      }
    }
  )
}
