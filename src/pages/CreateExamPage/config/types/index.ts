import { QuestionType, QuestionList, QuestionItem } from 'server/fetchExam/types'



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

