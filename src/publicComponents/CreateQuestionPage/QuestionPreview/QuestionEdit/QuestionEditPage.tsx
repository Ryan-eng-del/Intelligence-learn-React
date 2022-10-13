import { Tabs } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { CreateExamRoutePage } from 'components/CreateExamPage'
import { Button } from 'antd'
import {
  FillBlank,
  Judge,
  MultipleChoice,
  ShortAnswer,
  SingleChoice
} from 'publicComponents/CreateQuestionPage'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowQuestionDetails } from 'server/fetchExam'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { QuestionEditPageWrapper } from './QuestionEditPageStyle'
export const QuestionEditPage: React.FC = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId: string }>()
  //请求对应的数据
  const { data, isLoading } = useShowQuestionDetails(questionId)

  const { Provider, Consumer } =
    React.createContext({...data!, questionId:questionId || "0"})


  return (
    <QuestionEditPageWrapper>
      <Provider value={{...data!,questionId:questionId || "0"}} >
        {
          isLoading ? <BaseLoading /> :
          <CreateExamRoutePage Consumer={Consumer}/>
        }
      </Provider>
    </QuestionEditPageWrapper>
  )
}
