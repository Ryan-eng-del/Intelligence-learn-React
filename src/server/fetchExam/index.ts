import { useMutation, useQuery} from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import {
  ExamListItem,
  QuestionBank,
  QuestionData,
  QuestionDataWithID,
  QuestionType,
  StudentPaperItem,
  WholeQuestion
} from './types'
import { message } from 'antd'
import { paperTarget } from 'publicComponents/ExamPage/PublishPanel/PublishPanel'

/** 添加试题 */
export const useCreateQuestion = () => {
  return useMutation(
    async (QuestionItem: QuestionData) => {
      await delayFetch()
      return client.post({
        url: '/question/teacher/create',
        data: {
          ...QuestionItem
        }
      })
    },
    {
      onSuccess: () => {
        message.success('保存成功')
      },
      onError: () => {
        message.error('保存失败')
      }
    }
  )
}

/** 显示试题库 */
export const useShowCreateQuestion = (id?: string) => {
  return useQuery(['questionbank'], async () => {
    await delayFetch()
    return client.get<QuestionBank[]>({
      url: '/question/teacher/show-all',
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
      url: `/question/teacher/show-one`,
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
      url: `/paper/teacher/show-all`,
      params: {
        courseId: courseID
      }
    })
  })
}

/** 添加空试题 */
export const useCreateEmptyQuestion = () => {
  return useMutation(
    async (type: QuestionType) => {
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
        url: '/question/teacher/create',
        data: defData
      })
      let id = '1'
      qID.then((v) => {
        id = v
      })
      return { ...defData, questionId: id }
    },
    {
      onSuccess: () => {
        message.success('添加空试题成功')
      },
      onError: () => {
        message.error('添加失败')
      }
    }
  )
}

/** 更新题目 */
export const useUpadateQuestion = () => {
  return useMutation(
    async (QuestionItem: QuestionDataWithID) => {
      await delayFetch()
      return client.post({
        url: '/question/teacher/update',
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
        url: '/question/teacher/delete',
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


/** 学生端显示题目 */
export const useShowQuestionForStu = (id?: string) => {
  return useQuery([`preview-stu-${id}`], async () => {
    return client.get<StudentPaperItem>({
      url: `/question/stu/show/{questionId}`,
      params: {
        questionId: id
      }
    })
  })
}
/** 学生提交题目 */
export const useSubmitQuestion = () => {
  return useMutation(
    async (data:{
      questionId: string,
      questionType: QuestionType,
      questionAnswer: string,
      questionExistType: string
    }) => {
      await delayFetch()
      return client.post({
        url: '/question/stu/submit',
        data: data
      })
    },
    {
      onSuccess: () => {
        message.success('提交成功')
      },
      onError: () => {
        message.error('提交失败')
      }
    }
  )
}

export const useGetPaperTarget = (courseID:string)=>{
  return useQuery([`paperTarget-${courseID}`],
  ()=>{
    return client.get<paperTarget>({
      url: `/paper/teacher/get-target`,
      params: {
        courseID: courseID
      }
    })
  }
  )
}