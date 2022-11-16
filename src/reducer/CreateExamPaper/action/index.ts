import { IQuestionType, IQuestionTypeAddAction, IQuestionTypeInitialState } from '../type/type'

/*处理添加试题的action*/
export const handleAddActionOnQuestion = (
  state: IQuestionTypeInitialState<IQuestionType>,
  action: IQuestionTypeAddAction
) => {
  const addActionMap = {
    addSingle: 'singleChoice',
    addMultiple: 'multipleChoice',
    addFillBlank: 'fillBlankData',
    addShortAnswer: 'shortAnswer',
    addJudge: 'judgeChoice'
  } as const
  return {
    ...state,
    [addActionMap[action.type]]: {
      list: state[addActionMap[action.type]].list.concat(action.payload as any),
      pointSum: state[addActionMap[action.type]].pointSum
    }
  }
}
