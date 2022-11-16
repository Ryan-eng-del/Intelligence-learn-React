import { QuestionConstantString } from '../../../server/fetchExam/types'

export interface IQuestionTypeInitialState<T> {
  singleChoice: {
    list: T[]
    pointSum: number
  }
  multipleChoice: {
    list: T[]
    pointSum: number
  }

  fillBlankData: {
    list: T[]
    pointSum: number
  }
  shortAnswer: {
    list: T[]
    pointSum: number
  }
  judgeChoice: {
    list: T[]
    pointSum: number
  }
}

export interface IQuestionType {
  score: number
  isStore: boolean
  questionId: string
  questionDescription: string
  courseId: string
  questionOption: string
  questionAnswerNum: number
  questionDifficulty: number
  questionType: QuestionConstantString
  rightAnswer: string
  pointIds: string[]
  questionAnswerExplain: string
}

export interface IEditQuestionType {
  editType: QuestionConstantString
  editQuestion: IQuestionType
}

export type IQuestionTypeAction = IQuestionTypeAddAction | IQuestionTypeEditAction

/*添加题目的action*/
export type IQuestionTypeAddAction =
  | { type: 'addSingle'; payload: IQuestionType }
  | { type: 'addMultiple'; payload: IQuestionType }
  | { type: 'addFillBlank'; payload: IQuestionType }
  | { type: 'addJudge'; payload: IQuestionType }
  | { type: 'addShortAnswer'; payload: IQuestionType }

/*编辑题目的action*/
export type IQuestionTypeEditAction = {
  type: 'editQuestion'
  payload: IEditQuestionType
}
