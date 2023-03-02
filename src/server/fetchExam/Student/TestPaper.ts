import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { ExamListItem, StudentPaper } from '../types'

/** 提交试卷 */
export const useSaveExam = () => {
  return useMutation(async (paperId: string) => {
    return client.post({
      url: '/paper/stu/submit-exam',
      data: {
        paperId
      }
    })
  })
}

/** 学生获取到试卷列表 */
export const useShowExamListPublished = (courseID?: string) => {
  return useQuery([`ExamListStuExam-${courseID || 'all'}`], async () => {
    return client.get<ExamListItem[]>({
      url: `/paper/stu/exams`,
      params: {
        courseId: courseID
      }
    })
  })
}

/** 学生获取到作业列表 */
export const useHomeWorkListPublished = (courseID: string) => {
  return useQuery([`ExamListStuHomework-${courseID}`], async () => {
    return client.get<any[]>({
      url: `/paper/stu/homeworks`,
      params: {
        courseId: courseID
      }
    })
  })
}

/** 学生获取到试卷 */
export const useShowQuestionForStudent = (id: string) => {
  return useQuery([`paperdoing-${id}`], async () => {
    return client.get<StudentPaper>({
      url: `/paper/stu/paper-detail/${id}`,
      params: {
        paperId: id
      }
    })
  })
}

/* 获取学生考试 */
export const useGetStuExam = (id: string) => {
  return useQuery(['stu/exams', id], () => {
    return client.get({
      url: '/paper/stu/exams'
    })
  })
}
