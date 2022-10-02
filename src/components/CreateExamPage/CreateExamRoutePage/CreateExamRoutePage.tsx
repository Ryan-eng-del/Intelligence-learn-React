import React, { useState } from 'react'
import { CreateExamRoutePageWrapper } from './CreateExamRoutePageStyle'
import {
  SingleChoice,
  MultipleChoice,
  FillBlank,
  ShortAnswer,
  Judge
} from 'publicComponents/CreateQuestionPage'
import { QuestionDataWithID, QuestionType } from 'server/fetchExam/types'

const CreateExamRoute: React.FC<{
  Consumer: React.Consumer<QuestionDataWithID | undefined>
  dispatch?: any
}> = ({ Consumer }) => {
  const mapper = (context: QuestionDataWithID) => ({
    [QuestionType.single]: <SingleChoice content={context} />,
    [QuestionType.multiple]: <MultipleChoice content={context} />,
    [QuestionType.shortAnswer]: <ShortAnswer content={context} />,
    [QuestionType.judge]: <Judge content={context} />,
    [QuestionType.fillBlank]: <FillBlank content={context} />
  })
  return (
    <CreateExamRoutePageWrapper>
      <Consumer>
        {(context) =>
          context ? (
            mapper(context)[context?.questionType as QuestionType]
          ) : (
            <h1>空状态</h1>
          )
        }
      </Consumer>
    </CreateExamRoutePageWrapper>
  )
}

export const CreateExamRoutePage = React.memo(CreateExamRoute)
