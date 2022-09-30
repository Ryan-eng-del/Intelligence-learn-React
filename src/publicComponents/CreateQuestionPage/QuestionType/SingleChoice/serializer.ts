import { QuestionDataWithID, QuestionType } from "server/fetchExam/types"
import { Data2NetworkSerializer, Network2DataSerializer } from "../Component/types"
import { join } from 'lodash'
// 题目结构
export type structure = {
  id: string,
  content: string,
  TrueOption: string,
  Options: {
    optionName: string,
    content: string
  }[],
  footer: {
    explanation: string,
    rate: number,
    knowledge: string[]
  }
}


export const Network2Data: Network2DataSerializer<structure> = (content) => (
  {
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
  }
)

export const Data2Network:Data2NetworkSerializer<structure> = (content) => (
  {
    questionId: content.id,
    courseId: "unknown",
    questionOption: join(content.Options,"<>"),
    questionAnswerNum: 4,
    questionDescription: content.content ,
    questionDifficulty: content.footer.rate ,
    questionType: QuestionType.single,
    rightAnswer: content.TrueOption,
    questionAnswerExplain: content.footer.explanation,
    pointIds: content.footer.knowledge
  }
)