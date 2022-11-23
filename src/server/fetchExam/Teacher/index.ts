import { useMutation } from '@tanstack/react-query'
import { client } from '../../index'

interface IUploadExamPaper {
  paperName: string
  questionsScore: number[]
  questionIds: string[]
}

export const useUploadExamPaper = (courseId: string) => {
  return useMutation(['paper'], async ({ paperName, questionIds, questionsScore }: IUploadExamPaper) => {
    return client.post({
      url: '/paper/teacher/create',
      data: {
        paperName,
        courseId,
        questionsScore,
        questionIds
      }
    })
  })
}
