import { IQuestionType, IQuestionTypeAction, IQuestionTypeAddAction, IQuestionTypeInitialState } from './type/type'
import { handleAddActionOnQuestion } from './action'

export const initialQuestionTypeState: IQuestionTypeInitialState<IQuestionType> = {
  singleChoice: {
    list: [],
    pointSum: 0
  },

  multipleChoice: {
    list: [],
    pointSum: 0
  },
  fillBlankData: {
    list: [],
    pointSum: 0
  },
  shortAnswer: {
    list: [],
    pointSum: 0
  },
  judgeChoice: {
    list: [],
    pointSum: 0
  }
}

export const handleEditActionOnQuestion = (state: IQuestionTypeInitialState<IQuestionType>) => {
  return { ...state }
}
export const questionTypeReducer = (state: IQuestionTypeInitialState<IQuestionType>, action: IQuestionTypeAction) => {
  const isAddAction = action.type.includes('add')
  const isEdit = action.type.includes('edit')
  /*处理添加试题逻辑*/
  if (isAddAction) {
    return handleAddActionOnQuestion(state, action as IQuestionTypeAddAction)
  } else if (isEdit) {
    return handleEditActionOnQuestion(state)
  } else {
    return state
  }
}
