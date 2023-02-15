import { useMutation } from '@tanstack/react-query'
import { client } from 'server'

interface SaveQs {
  paperId: string
  questionId: string
  studentAnswer: string | null
  submitVersion: number | undefined
}
export const useSaveSingleQs = () => {
  return useMutation(async ({ paperId, questionId, submitVersion, studentAnswer }: SaveQs) => {
    return client.post({
      url: '/paper/stu/save-exam',
      data: {
        paperId,
        questionId,
        studentAnswer,
        submitVersion
      }
    })
  })
}

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
