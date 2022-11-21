import React, { useReducer, useRef, useState } from 'react'
import { CreateExamHeader, CreateExamMenu, CreateExamNav, CreateExamRoutePage } from 'components/CreateExamPage'
import { useParams } from 'react-router-dom'
import { QuestionConstantString, QuestionTypeAction } from 'server/fetchExam/types'
import {
  CreateExamBodyLeftWrapper,
  CreateExamBodyRightWrapper,
  CreateExamBodyWrapper,
  CreateExamCenterWrapper,
  CreateExamNavWrapper,
  CreateExamPageWrapper,
  CreateExamQuestion
} from './CreateExamPageStyle'
import { initialQuestionTypeState, questionTypeReducer } from '../../reducer/CreateExamPaper/questionTypeReducer'
import { createQuestionObj } from './util/util'
import { IQuestionType } from '../../reducer/CreateExamPaper/type/type'
import { useCurrentClassInfo } from 'context/ClassInfoContext'

export const CreateExamPage: React.FC = () => {
  const { paperid } = useParams()
  const idSet = useRef<Set<number>>(new Set())
  /*当前正在编辑的题目*/
  const [curEditQuestion, setCurEditQuestion] = useState<undefined | IQuestionType>()
  /*当前正再编辑题目的次序*/
  const [curOrder, setCurOrder] = useState(1)
  const [questionTypeState, dispatchQuestionType] = useReducer(questionTypeReducer, initialQuestionTypeState)

  const handleOnEdit = (edit: IQuestionType) => {
    setCurEditQuestion(edit)
  }
  const { classInfo } = useCurrentClassInfo()
  /*添加考试题目*/
  const addQuestionType = (type: QuestionConstantString) => {
    const actionType = QuestionTypeAction[type] as any
    dispatchQuestionType({ type: actionType, payload: createQuestionObj(type, idSet.current,classInfo.courseId)})
  }

  return (
    <>
      <CreateExamPageWrapper>
        <CreateExamCenterWrapper>
          <CreateExamHeader questionTypeState={questionTypeState} />
          <CreateExamBodyWrapper>
            <CreateExamBodyLeftWrapper>
              <CreateExamNav
                questionTypeState={questionTypeState}
                setCurEdit={(curEdit: IQuestionType) => handleOnEdit(curEdit)}
                setCurOrder={(curOrder: number) => setCurOrder(curOrder)}
                curEditQuestion={curEditQuestion!}
              />
            </CreateExamBodyLeftWrapper>
            <CreateExamBodyRightWrapper>
              <CreateExamNavWrapper>
                <CreateExamMenu addQuestionType={addQuestionType} />
              </CreateExamNavWrapper>
              <CreateExamQuestion>
                <CreateExamRoutePage
                  curEdit={curEditQuestion!}
                  curOrder={curOrder}
                  setCurEditQuestion={setCurEditQuestion}
                  dispatchQuestionType={dispatchQuestionType}
                ></CreateExamRoutePage>
              </CreateExamQuestion>
            </CreateExamBodyRightWrapper>
          </CreateExamBodyWrapper>
        </CreateExamCenterWrapper>
      </CreateExamPageWrapper>
    </>
  )
}
