import { IChapterReducerAction, IChapterReducerState } from './type/type'

export const initialChapterState: IChapterReducerState = {
  expandKeys: [],
  curAddInputValue: '',
  focusState: false,
  ChapterError: null
}

export const chapterReducer = (state: IChapterReducerState, action: IChapterReducerAction) => {
  const { expandKeys: lastExpandKeys } = state
  switch (action.type) {
    case 'setFocusState':
      return { ...state, focusState: action.focusState }
    case 'setCurInputValue':
      return { ...state, curAddInputValue: action.curInputValue }
    case 'setError':
      return { ...state, ChapterError: action.error }
    case 'setExpandKeys':
      return { ...state, expandKeys: action.expandKeys(lastExpandKeys) }
    default:
      throw new Error('Reducer Error')
  }
}
