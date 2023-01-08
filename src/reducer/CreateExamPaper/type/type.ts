import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { QuestionConstantString, QuestionType } from 'server/fetchExam/types'

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
export interface IQuestionInfo {
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
export interface IQuestionType extends IQuestionInfo {
  score: number
  isStore: boolean
  questionId: string
}

export function IQuestionTypeConstructor(type: QuestionType) {
  return {
    questionId: crypto.randomUUID(),
    score: 1,
    isStore: false,
    courseId: useCurrentClassInfo().classInfo.courseId,
    questionDescription: '',
    questionOption: '',
    questionDifficulty: 0,
    questionType: type,
    questionAnswerNum: 1,
    rightAnswer: '',
    questionAnswerExplain: '',
    pointIds: []
  }
}

export interface IEditQuestionType {
  editType: QuestionConstantString
  editQuestion: IQuestionType
}

export type IQuestionTypeAction =
  | IQuestionTypeAddAction
  | IQuestionTypeEditAction
  | IQuestionTypeDeleteAction
  | IQuestionTypeSaveAction
  | IQuestionTypePreviewAction
  | IQuestionTypeSaveStateAction

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
  payload: { content: string | number; id: string; target: keyof IQuestionType; index?: number }
}

/* 删除题目的action */
export type IQuestionTypeDeleteAction = {
  type: 'deleteQuestion'
  id: string
}

/* 保存试题的action */
export type IQuestionTypeSaveAction = {
  type: 'saveQuestion'
  id: string
  setModalOpen: any
  setEditQuestion: any
  isPreview?: boolean
}
/* 保存试题的action */
export type IQuestionTypePreviewAction = {
  type: 'previewQuestion'
  id: string
  setModalOpen: any
  setEditQuestion: any
}

/* 保存试题状态的action */
export type IQuestionTypeSaveStateAction = {
  type: 'saveQuestionState'
  id: string
  oldId: string
}
