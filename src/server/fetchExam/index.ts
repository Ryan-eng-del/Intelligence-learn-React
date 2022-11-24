import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { ExamListItem, QuestionBank, QuestionConstantString, QuestionDataWithID, QuestionType, StudentPaperItem, WholeQuestion } from './types'
import { message } from 'antd'
import { paperTarget, PublishExamType, PublishHomeworkType } from 'publicComponents/ExamPage/types'
import { IQuestionInfo, IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { MutationMsg } from 'util/MutationMsg'
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
  console.log("正在获取题库，课程id:",id);
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

/** 展示题目详细信息做展示试题页面 */
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

/** 获取此课程的全部试卷 */
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

/** 更新题目 */
export const useUpadateQuestion = () => {
  return useMutation(
    async (QuestionItem: QuestionDataWithID) => {
      return client.put({
        url: '/question/teacher/update',
        data: {
          ...QuestionItem
        }
      })
    }
  )
}

/** 删除试题 */
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (id: string) => {
      console.log("正在删除：",id);
      return client.delete({
        url: '/question/teacher/delete',
        data: { id }
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
  console.log("获取题目：",id);
  return useQuery([`preview-stu-${id}`], async () => {
    return client.get<StudentPaperItem>({
      url: `/question/stu/show/${id}`
    })
  })
}
/** 学生提交题目 */
export const useSubmitQuestion = () => {
  return useMutation((data: {
      questionId: string,
      questionType: QuestionConstantString,
      questionAnswer: string,
    }) => {
      console.log("提交的答案是：",data.questionAnswer);
      return client.post({
        url: '/question/stu/submit',
        data: data
      })
    }
  )
}


/** 发布页面获取学生列表 */
export const useGetPaperTarget = (courseID: string) => {
  return useQuery([`paperTarget-${courseID}`],
    () => {
      return client.get<paperTarget>({
        url: `/paper/teacher/get-target`,
        params: {
          courseID: courseID
        }
      })
    }
  )
}

/** 发布试卷 */
export const useReleaseExam = () => {
  return useMutation((data: PublishExamType) => {
    return client.post({
      url: "/paper/teacher/release-exam",
      params: {
        ...data
      }
    })
  }, MutationMsg("提交"))
}
export const useReleaseHomework = () => {
  return useMutation((data: PublishHomeworkType) => {
    return client.post({
      url: "/paper/teacher/release-exam",
      params: {
        ...data
      }
    })
  }, MutationMsg("发布试卷"))
}
