import React, { useReducer } from 'react'
import {
  CreateExamNav,
  CreateExamRoutePage,
  CreateExamHeader,
  CreateExamMenu
} from 'components/CreateExamPage'
import { CreateExamPageReducer, initialState } from './config/reducer'
import { CreateExamPageWrapper } from './CreateExamPageStyle'
import { useMount } from 'hook/useMount'
import { useAddTestPaper, useShowTestPaper } from 'server/fetchExam/TestPaper'


export const CreateExamPage: React.FC<{
  paperID?: string
}> = ({paperID}) => {
  const [state, dispatch] = useReducer(CreateExamPageReducer, initialState)
  const { questionList, curEdit } = state
  const CurrentQuestionData = React.createContext(curEdit)
  const { Consumer, Provider } = CurrentQuestionData

  /** 合并部分 */
  // const { data, isLoading } = paperID === ''
  // ? useAddTestPaper("这里是课程ID") // 新建试卷
  // : useShowTestPaper(paperID!)   // 打开试卷

  /** 仅打开部分 */
  const { data, isLoading } = useShowTestPaper(paperID)   // 打开试卷


  return (
    <>
      <CreateExamPageWrapper>
        <CreateExamHeader state={state} dispatch={dispatch} />
        <div style={{ display: 'flex', height: '500px' }}>

          <CreateExamNav questionList={questionList} dispatch={dispatch} />
          <div style={{ width: '80%' }}>
              <CreateExamMenu
                questionList={questionList}
                dispatch={dispatch}
                ></CreateExamMenu>
            {/* 提供当前编辑的题目数据 */}
            <Provider value={curEdit}>
              <CreateExamRoutePage Consumer={Consumer} ></CreateExamRoutePage>
            </Provider>
          </div>
        </div>
      </CreateExamPageWrapper>
    </>
  )
}


