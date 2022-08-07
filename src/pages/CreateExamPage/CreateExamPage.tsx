import React, { useReducer } from 'react'
import {
  CreateExamNav,
  CreateExamRoutePage,
  CreateExamHeader,
  CreateExamMenu
} from 'components/CreateExamPage'
import { CreateExamPageReducer, initialState } from './config/reducer'
export const CreateExamPage: React.FC = () => {
  const [state, dispatch] = useReducer(CreateExamPageReducer, initialState)
  const { questionList } = state
  return (
    <>
      <CreateExamHeader state={state} dispatch={dispatch} />
      <div style={{ display: 'flex', height: '500px' }}>
        <CreateExamNav questionList={questionList} dispatch={dispatch} />
        <div style={{ width: '100%' }}>
          <CreateExamMenu
            questionList={questionList}
            dispatch={dispatch}
          ></CreateExamMenu>
          <CreateExamRoutePage></CreateExamRoutePage>
        </div>
      </div>
    </>
  )
}
