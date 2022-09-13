import { QuestionType, WholeQuestion } from 'server/fetchExam/types'

/** 题目在试卷中的类型 */
export interface QuestionItem {
  id: string
  item_key: number //题目序号
  item_data?: WholeQuestion
}



/** 试卷编辑导航一种题型的折叠面板 */
export interface QuestionList {
  id: string
  type: QuestionType //题目类型
  amount: number //题目总数
  isExists: boolean //表示该类型题目是否已经存在
  questiton: QuestionItem[]
  questitonScore: number[]
}

export interface CreateExamState {
  id: string
  List_key: number //第x份作业，需要是1，2，3，4的顺序，不能是随机的
  questionList: QuestionList[]
  curEdit: any  //当前正在编辑的题目
}

export type CreateExamPageAction =
  | { type: 'changeIsExists'; isExists: boolean; listType: QuestionType }
  | {
      type: 'addQuestionItem'
      listType: QuestionType
      questionItem: QuestionItem
    }
  | {
      type: 'removeQuestionItem'
      listType: QuestionType
      key: number
      id: string
    }
  | { type: 'removeQuestionList'; listType: QuestionType }
  | { type: 'rearrangeItem' }

