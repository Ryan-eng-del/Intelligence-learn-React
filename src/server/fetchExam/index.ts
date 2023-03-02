import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { paperTarget, PublishExamType, PublishHomeworkType } from 'publicComponents/ExamPage/types'
import { IQuestionInfo, IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { client } from 'server'
import { MutationMsg } from 'util/MutationMsg'
import { ExamListItem, QuestionBank, QuestionConstantString, QuestionOfPaperVO, WholeQuestion } from './types'

/** 添加试题 */
export const useCreateQuestion = () => {
  return useMutation(async (QuestionItem: IQuestionInfo) => {
    return client.post({
      url: 'question/teacher/create',
      data: {
        ...QuestionItem
      }
    })
  })
}

/** 获取此课程的全部题目 */
export const useShowCreateQuestion = (id: string) => {
  return useQuery([`questionbank-${id}`], async () => {
    return client.get<QuestionBank[]>({
      url: '/question/teacher/show-all',
      params: {
        courseId: id
      }
    })
  })
}

/** 展示题目详细信息做展示试题页面 */
export const useShowQuestionDetails = (id?: string) => {
  return useQuery([`previewQ-${id}`], async () => {
    return await client.get<WholeQuestion>({
      url: `/question/teacher/show-one`,
      params: {
        questionId: id
      }
    })
  })
}

/** 获取此课程的全部试卷 */
export const useShowExamList = (courseID: string) => {
  return useQuery([`ExamList-${courseID}`], async () => {
    return client.get<ExamListItem[]>({
      url: `/paper/teacher/show-all`,
      params: {
        courseId: courseID
      }
    })
  })
}

/** 更新题目 */
export const useUpadateQuestion = () => {
  const queryClient = useQueryClient()
  let id = ''
  return useMutation(
    async (QuestionItem: IQuestionType) => {
      id = QuestionItem.questionId
      return client.put({
        url: '/question/teacher/update',
        data: {
          ...QuestionItem
        }
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`preview-${id}`])
      }
    }
  )
}

/** 删除试题 */
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (id: string) => {
      return client.delete({
        url: '/question/teacher/delete',
        params: { questionId: id }
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['questionbank'])
      }
    }
  )
}

/** 学生端显示题目 */
export const useShowQuestionForStu = (id?: string) => {
  return useQuery([`preview-stu-${id}`], async () => {
    return client.get<QuestionOfPaperVO>({
      url: `/question/stu/show/${id}`
    })
  })
}

/** 学生提交题目 */
export const useSubmitQuestion = () => {
  return useMutation((data: { questionId: string; questionType: QuestionConstantString; questionAnswer: string }) => {
    return client.post({
      url: '/question/stu/submit',
      data: data
    })
  })
}

/** 发布页面获取学生列表 */
export const useGetPaperTarget = (courseId: string) => {
  return useMutation([`paperTarget-${courseId}`], (paperId: string) => {
    return client.get<paperTarget>({
      url: `/paper/teacher/get-target`,
      params: {
        courseId,
        paperId
      }
    })
  })
}

/** 发布试卷 */
export const useReleaseExam = () => {
  return useMutation((data: PublishExamType) => {
    return client.post({
      url: '/paper/teacher/release-exam',
      data
    })
  }, MutationMsg('发布试卷'))
}

export const useReleaseHomework = () => {
  return useMutation((data: PublishHomeworkType) => {
    return client.post({
      url: '/paper/teacher/release-homework',
      data
    })
  }, MutationMsg('发布试卷'))
}

/* 获取学生考试 */
export const useGetStuExam = (id: string) => {
  return useQuery(['stu/exams', id], () => {
    return client.get({
      url: '/paper/stu/exams'
    })
  })
}

export const submitPaper = (paperId: string) => {
  return useMutation(() => {
    return client.post({
      url: '/paper/stu/submit-exam',
      data: {
        paperId
      }
    })
  })
}

export const useRecommendQuestion = (courseId: string) => {
  return useMutation((pointId: string) => {
    return client.get({
      url: '/recommend/pointRecommend',
      params: {
        pointId,
        courseId
      }
    })
  })
}
