import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '../../index'

interface IUploadExamPaper {
  paperName: string
  questionsScore: number[]
  questionIds: string[]
}

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
