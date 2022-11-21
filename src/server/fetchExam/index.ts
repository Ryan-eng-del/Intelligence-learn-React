import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { ExamListItem, QuestionBank, QuestionConstantString, QuestionDataWithID, QuestionType, StudentPaperItem, WholeQuestion } from './types'
import { message } from 'antd'
import { paperTarget, PublishExamType, PublishHomeworkType } from 'publicComponents/ExamPage/types'
import { IQuestionInfo, IQuestionType } from 'reducer/CreateExamPaper/type/type'
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
export const useCreateEmptyQuestion = (courseId:string) => {
  return useMutation(async (type: QuestionType) => {
    const defData = {
      questionDescription: '',
      courseId,
      pointIds: [],
      questionOption: '<><><>',
      questionAnswerExplain: '',
      questionAnswerNum: 4,
      questionDifficulty: 1,
      questionType: type,
      rightAnswer: 'A'
    }
    const qID = await client.post<string>({
      url: '/question/teacher/create',
      data: defData
    })
    console.log("在",courseId,"创建题目,题目的ids",qID);
    return { ...defData, questionId: qID }
  })
}

/** 更新题目 */
export const useUpadateQuestion = () => {
  return useMutation(
    async (QuestionItem: QuestionDataWithID) => {
      await delayFetch()
      return client.put({
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
    async (data: {
      questionId: string,
      questionType: QuestionConstantString,
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

export const useReleaseExam = () => {
  return useMutation((data: PublishExamType) => {
    return client.post({
      url: "/paper/teacher/release-exam",
      params: {
        paper_id: data.paper_id,
        student_ids: data.student_ids,
        is_allow_make_up: data.is_allow_make_up,
        pass_score: data.pass_score,
        start_time: data.start_time,
        end_time: data.end_time,
        limit_time: data.limit_time,
        limit_submit_time: data.limit_submit_time,
        limit_enter_time: data.limit_enter_time,
        is_distinguish_case: data.is_distinguish_case,
        remake_time: data.remake_time,
        is_show_score: data.is_show_score,
        is_allow_show_paper: data.is_allow_show_paper,
        is_get_high_score: data.is_get_high_score,
        is_show_rank: data.is_show_rank,
      }
    })
  }, {
    onSuccess: () => {
      message.success('提交成功')
    },
    onError: () => {
      message.error('提交失败')
    }
  })
}
export const useReleaseHomework = () => {
  return useMutation((data: PublishHomeworkType) => {
    return client.post({
      url: "/paper/teacher/release-exam",
      params: {
        paper_id: data.paper_id,
        student_ids: data.student_ids,
        is_allow_make_up: data.is_allow_make_up,
        start_time: data.start_time,
        end_time: data.end_time,
        remake_time: data.remake_time,
        is_get_high_score: data.is_get_high_score,
      }
    })
  }, {
    onSuccess: () => {
      message.success('提交成功')
    },
    onError: () => {
      message.error('提交失败')
    }
  })
}
