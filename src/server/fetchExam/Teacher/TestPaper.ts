import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { paperTarget, PublishExamType, PublishHomeworkType } from 'publicComponents/ExamPage/types'
import { client } from 'server'
import { MutationMsg } from 'util/MutationMsg'
import { ExamListItem, IUploadExamPaper, PostTestPaper, TestPaper } from '../types'

/** 上传试卷 */
export const useUploadExamPaper = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async ({ paperName, questionIds, questionsScore }: IUploadExamPaper) => {
      return client.post({
        url: '/paper/teacher/create',
        data: {
          paperName,
          courseId,
          questionsScore,
          questionIds
        }
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`ExamList-${courseId}`])
      }
    }
  )
}

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
export const useDeleteTestPaper = () => {
  return useMutation(async (paperId: string) => {
    return client.post({
      url: '/paper/teacher/update',
      data: paperId
    })
  }, MutationMsg('试卷删除'))
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
