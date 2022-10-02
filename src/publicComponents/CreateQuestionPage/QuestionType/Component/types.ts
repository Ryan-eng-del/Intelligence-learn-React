import { QuestionDataWithID } from 'server/fetchExam/types'

// 限制转换器的类型
export type Network2DataConverter<T> = (Network: QuestionDataWithID) => T
export type Data2NetworkConverter<T> = (Network: T) => QuestionDataWithID
export type FooterType = {
  explanation: string
  rate: number
  knowledge: Array<string>
}
