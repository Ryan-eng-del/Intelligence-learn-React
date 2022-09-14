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
import { QuestionItem, QuestionType } from 'server/fetchExam/types'
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
        {(context: QuestionItem) => (<>
          <div>{JSON.stringify(context)}</div>
          <hr></hr>
          {/* 查找对应组件 */}
          { context === undefined ? <h1>请选择一道题</h1> :
            ((t:keyof typeof mapper) => mapper[t])(context.item_data.questionType)
          }
        </>)}
      </Consumer>
    </CreateExamRoutePageWrapper>
  )
}

