import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'

import { TestPaper, PostTestPaper, StudentPaper, ExamListItem } from '../types'
import { MutationMsg } from 'util/MutationMsg'

/** 打开一张试卷 */
export const useShowTestPaper = (paperId: string) => {
  return useQuery([`TestPaper-${paperId}`], () => {
    return client.get<TestPaper>({
      url: `/paper/teacher/paper-preview`,
      params: { id: paperId }
    })
  })
}

/** 保存这张试卷 */
export const useSaveTestPaper = () => {
  return useMutation(async (paper: PostTestPaper) => {
    return client.post({
      url: '/paper/teacher/update',
      data: paper
    })
  }, MutationMsg('试卷保存'))
}

// TODO: 后端没有接口
/** 删除这张试卷 */
// export const useDeleteTestPaper = () => {
//   return useMutation(
//     async (paperId: string) => {
//       return client.post({
//         url: '/paper/teacher/update',
//         data: paperId
//       })
//     },MutationMsg("试卷删除")
//   )
// }

/** 学生获取到试卷列表 */
export const useShowExamListPublished = (courseID: string) => {
  return useQuery([`ExamListS-${courseID}`], async () => {
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
  return useQuery([`ExamListS-${courseID}`], async () => {
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
  return useQuery([`paperdoing-${id}`], () => {
    return client.get<StudentPaper>({
      url: `/paper/stu/paper-detail/${id}`
    })
  })
}

/** 学生提交试卷 */
export const useSubmitTestPaper = () => {
  return useMutation(async (paper: { questionId: string; studentAnswer: string }[]) => {
    return client.post({
      url: '/paper/stu/submit',
      data: paper
    })
  }, MutationMsg('提交'))
}
