import { QuestionType } from 'publicComponents/CreateQuestionPage/config/type'
export interface QuestionItem {
  id: string
  item_key: number //题目序号
}

export interface QuestionList {
  id: string
  type: QuestionType //题目类型
  amount: number //题目总数
  isExists: boolean //表示该类型题目是否已经存在
  children: Array<QuestionItem> | []
}

export interface CreateExamState {
  id: string
  List_key: number //第x份作业，需要是1，2，3，4的顺序，不能是随机的
  questionList: Array<QuestionList> | []
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

export type DataAndSetter<T> = {
  content: T
  setContent: (content: T) => void
}
