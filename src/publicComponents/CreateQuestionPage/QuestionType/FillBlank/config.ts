import { join } from 'lodash'
import {QuestionType } from 'server/fetchExam/types'
import {
  Data2NetworkConverter,
  Network2DataConverter,
  Network2SummaryConverter
} from '../Component/types'

// // 题目结构
export type structure = {
  id: string
  content: string
  isSubjective: boolean
  Options: {
    id: number
    content: string
  }[]
  footer: {
    explanation: string
    rate: number
    knowledge: string[]
  }
}

export const Network2Data: Network2DataConverter<structure> = (content) => ({
  id: content.questionId,
  content: content.questionDescription,
  isSubjective: Boolean(parseInt(content.rightAnswer)), //设置主客观性
  Options: content.questionOption.split('<>').map((i, x) => ({
    id: x,
    content: i
  })),
  footer: {
    explanation: content.questionDescription,
    rate: content.questionDifficulty,
    knowledge: content.pointIds
  }
})

export const Data2Network: Data2NetworkConverter<structure> = (content) => ({
  questionId: content.id,
  courseId: 'unknown',
  questionOption: join(
    content.Options.map((i) => i.content),
    '<>'
  ),
  questionAnswerNum: content.Options.length,
  questionDescription: content.content,
  questionDifficulty: content.footer.rate,
  questionType: QuestionType.fillBlank,
  rightAnswer: content.isSubjective ? '1' : '0',
  questionAnswerExplain: content.footer.explanation,
  pointIds: content.footer.knowledge
})

// 写题的时候
export type summary = {
  id: string
  content: string
  AnsNum: number
  score?: number
}

export const Network2Sutdent: Network2SummaryConverter<summary> = (
  content
) => ({
  id: content.questionId!,
  content: content.questionDescription,
  score: content.questionScore,
  // TODO:
  AnsNum: content.questionAnswerNum
})
