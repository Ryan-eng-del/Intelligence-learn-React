import React from 'react'
import { CreateExamRoutePageWrapper } from './CreateExamRoutePageStyle'
import {
  SingleChoice,
  MultipleChoice,
  FillBlank,
  ShortAnswer,
  Programming,
  Judge
} from 'publicComponents/CreateQuestionPage/CreateQuestionRoutePage'
import { QuestionDataWithID, QuestionType } from 'server/fetchExam/types'

export const CreateExamRoutePage: React.FC<{
  Consumer: React.Consumer<QuestionDataWithID | undefined>
  dispatch?: any
}> = ({ Consumer }) => {
  return (
    <CreateExamRoutePageWrapper>
      <Consumer>
        {(context) => (
          <>
            {/* <div>{JSON.stringify(context)}</div> */}
            {/* <hr></hr> */}
            {/* 查找对应组件 */}
            {context === undefined ? (
              <h1>请选择一道题</h1>
            ) : context.questionType === QuestionType.single ? (
              <SingleChoice content={context} />
            ) : context.questionType === QuestionType.multiple ? (
              <MultipleChoice content={context} />
            ) : context.questionType === QuestionType.fillBlank ? (
              <FillBlank content={context} />
            ) : context.questionType === QuestionType.shortAnswer ? (
              <ShortAnswer content={context} />
            ) : context.questionType === QuestionType.programming ? (
              <Programming content={context} />
            ) : context.questionType === QuestionType.judge ? (
              <Judge content={context} />
            ) : (
              0
            )}
          </>
        )}
      </Consumer>
    </CreateExamRoutePageWrapper>
  )
}
