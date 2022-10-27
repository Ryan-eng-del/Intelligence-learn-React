import { QuestionDataWithID, StudentPaperItem } from 'server/fetchExam/types'

// 限制转换器的类型
export type Network2DataConverter<T> = (Network: QuestionDataWithID) => T
export type Data2NetworkConverter<T> = (Network: T) => QuestionDataWithID
export type FooterType = {
  explanation: string
  rate: number
  knowledge: Array<string>
}

// 学生部分
export type Network2SummaryConverter<T> = (Network: StudentPaperItem) => T
export type Summary2NetworkConverter<T> = (Network: T) => StudentPaperItem
