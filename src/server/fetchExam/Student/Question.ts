import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { QuestionConstantString, QuestionOfPaperVO, QuestionType, SaveQs } from 'server/fetchExam/types'

/** 提交题目(试卷中) */
export const useSaveSingleQs = () => {
  return useMutation(async ({ paperId, questionId, submitVersion, studentAnswer }: SaveQs) => {
    return client.post({
      url: '/paper/stu/submit-exam',
      data: {
        paperId,
        questionId,
        studentAnswer,
        submitVersion
      }
    })
  })
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

/** 获取推荐题目（根据知识点） */
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

/** 获取推荐题目（随机） */
export const useRandomQuestion = (courseId: string) => {
  return useMutation(() => {
    return client.get({
      url: '/question/stu/recommend',
      params: {
        courseId
      }
    })
  })
}

/** 收藏题目 */
export const useCollectQuestion = () => {
  return useMutation((questionId: string) => {
    return client.post({
      url: '/question/stu/collect',
      params: {
        questionId
      }
    })
  })
}

/** 获取收藏题目列表 */
export const useCollectList = (courseId?: string, questionType?: QuestionType) => {
  return useQuery([`CollectList-stu-${courseId}-${questionType}`], async () => {
    return client.get<any>({
      url: '/question/stu/show-collect',
      params: {
        courseId,
        questionType: questionType?.toString()
      }
    })
  })
}

/** 删除收藏题目 */
export const useDelectCollectQuestion = () => {
  return useMutation((questionId: string) => {
    return client.delete({
      url: `/question/stu/collect/${questionId}`
    })
  })
}

/** 显示错题列表*/
export const useWrongQuestionList = (courseId?: string, questionType?: QuestionType) => {
  return useQuery([`Wrong-stu-${courseId}-${questionType}`], async () => {
    return client.get<any>({
      url: '/question/stu/show-wrong',
      params: {
        courseId,
        questionType: questionType?.toString()
      }
    })
  })
}

/** 删除错题 */
export const useDelectWrongQuestion = () => {
  return useMutation((questionId: string) => {
    return client.delete({
      url: `/question/stu/delete-wrong/${questionId}`
    })
  })
}

/** 删除全部错题 */
export const useDelectAllWrongQuestion = () => {
  return useMutation((courseId: string) => {
    return client.delete({
      url: `/question/stu/delete-all-wrong/${courseId}`
    })
  })
}
