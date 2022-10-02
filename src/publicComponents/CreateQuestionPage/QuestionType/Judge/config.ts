import { QuestionType } from 'server/fetchExam/types'
import {
  Data2NetworkConverter,
  Network2DataConverter
} from '../Component/types'

// // 题目结构
export type structure = {
  id: string
  content: string
  isTrue: boolean
  footer: {
    explanation: string
    rate: number
    knowledge: string[]
  }
}

export const Network2Data: Network2DataConverter<structure> = (content) => ({
  id: content.questionId,
  content: content.questionDescription,
  isTrue: Boolean(parseInt(content.rightAnswer)), //设置主客观性
  footer: {
    explanation: content.questionDescription,
    rate: content.questionDifficulty,
    knowledge: content.pointIds
  }
})

export const Data2Network: Data2NetworkConverter<structure> = (content) => ({
  questionId: content.id,
  courseId: 'unknown',
  questionOption: '',
  questionAnswerNum: 1,
  questionDescription: content.content,
  questionDifficulty: content.footer.rate,
  questionType: QuestionType.shortAnswer,
  rightAnswer: content.isTrue ? '1' : '0',
  questionAnswerExplain: content.footer.explanation,
  pointIds: content.footer.knowledge
})
