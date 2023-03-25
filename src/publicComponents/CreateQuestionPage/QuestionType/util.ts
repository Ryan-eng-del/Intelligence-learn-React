import { IQuestionType } from 'reducer/CreateExamPaper/type/type'

export const isCouldSaveQuestion = (question: IQuestionType): { message: string; isError: boolean } => {
  const { questionDescription, questionType, questionAnswerExplain, rightAnswer } = question
  let message = ''
  let isError = false
  if (!questionDescription.trim()) {
    message = '请先设置题干'
    isError = true
  } else if (!questionAnswerExplain.trim()) {
    message = '请设置题目解释'
    isError = true
  } else if (questionType === 0) {
    if (!rightAnswer.trim()) {
      message = '请设置正确答案'
      isError = true
    }
  } else if (questionType === 1) {
    if (rightAnswer.length === 1) {
      message = '多选题请设置多个选项'
      isError = true
    }
  }
  return { message, isError }
}
