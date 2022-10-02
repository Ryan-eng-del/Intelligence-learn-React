import { QuestionType } from 'server/fetchExam/types'
import {
  Data2NetworkConverter,
  Network2DataConverter
} from '../Component/types'
import { join } from 'lodash'
// 题目结构
export type structure = {
  id: string
  content: string
  TrueOption: string
  Options: {
    optionName: string
    content: string
  }[]
  footer: {
    explanation: string
    rate: number
    knowledge: string[]
  }
}

export const Network2Data: Network2DataConverter<structure> = (content) => ({
  id: content.questionId!,
  content: content.questionDescription,
  TrueOption: content.rightAnswer,
  Options: content.questionOption.split('<>').map((i, x) => ({
    optionName: String.fromCharCode(x + 65),
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
  questionAnswerNum: 4,
  questionDescription: content.content,
  questionDifficulty: content.footer.rate,
  questionType: QuestionType.single,
  rightAnswer: content.TrueOption,
  questionAnswerExplain: content.footer.explanation,
  pointIds: content.footer.knowledge
})
