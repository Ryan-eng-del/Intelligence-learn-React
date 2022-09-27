import React from 'react'
import { CreateExamRoutePageWrapper } from './CreateExamRoutePageStyle'
import {
  SingleChoice,
  MultipleChoice,
  FillBlank,
  ShortAnswer,
  Programming,
  Judge
} from 'publicComponents/CreateQuestionPage'
import { QuestionDataWithID, QuestionType } from 'server/fetchExam/types'
import { Tabs } from 'antd'

export const CreateExamRoutePage: React.FC<{
  Consumer: React.Consumer<QuestionDataWithID | undefined>
  dispatch?: any
}> = ({ Consumer }) => {
  return (
    <>
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
  </>
  )
}

//
export const RouteTest: React.FC<{
  Consumer: React.Consumer<QuestionDataWithID | undefined>
}> = ({ Consumer }) => {
  const mapper = (context: any) => ({
    [QuestionType.single]:<SingleChoice content={context}/>,
    [QuestionType.multiple]:<MultipleChoice content={context}/>,
    [QuestionType.shortAnswer]:<ShortAnswer content={context}/>,
    [QuestionType.programming]:<Programming content={context}/>,
    [QuestionType.judge]:<Judge content={context}/>,
    [QuestionType.fillBlank]:<FillBlank content={context}/>,
  })

  return (
    <CreateExamRoutePageWrapper>
      <Consumer>
        {context => mapper(context)[context?.questionType as QuestionType]}
      </Consumer>
    </CreateExamRoutePageWrapper>
  )
}