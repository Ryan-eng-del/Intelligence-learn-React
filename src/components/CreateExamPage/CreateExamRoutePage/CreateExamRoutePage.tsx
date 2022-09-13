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
import { QuestionType } from 'server/fetchExam/types'
const mapper = {
  [QuestionType.single]: <SingleChoice></SingleChoice>,
  [QuestionType.multiple]: <MultipleChoice></MultipleChoice>,
  [QuestionType.fillBlank]: <FillBlank></FillBlank>,
  [QuestionType.shortAnswer]: <ShortAnswer></ShortAnswer>,
  [QuestionType.programming]: <Programming></Programming>,
  [QuestionType.judge]: <Judge></Judge>
}

export const CreateExamRoutePage: React.FC<{
  Consumer: React.Consumer<any>
}> = ({Consumer}) => {

  return (
    <CreateExamRoutePageWrapper>
      <Consumer>
        {(context: any) => (<>
          <div>{JSON.stringify(context)}</div>
          <hr></hr>
          {((t:keyof typeof mapper) => mapper[t])(context.questionType as any)}
        </>)}
      </Consumer>
    </CreateExamRoutePageWrapper>
  )
}

