import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { CreateExamRoutePage } from 'components/CreateExamPage'
import React from 'react'
import {useParams } from 'react-router-dom'
import { useShowQuestionDetails } from 'server/fetchExam'
import { QuestionEditPageWrapper } from './QuestionEditPageStyle'

export const QuestionEditPage: React.FC = () => {

  const { questionId } = useParams<{ questionId: string }>()
  //请求对应的数据
  const { data, isLoading } = useShowQuestionDetails(questionId)

  const { Provider, Consumer } = React.createContext({ ...data!, questionId: questionId || '0' })

  return (
    <QuestionEditPageWrapper>
      <Provider value={{ ...data!, questionId: questionId || '0' }}>
        {/*{isLoading ? <BaseLoading /> : <CreateExamRoutePage curOrder={0} curEdit={null} />}*/}
      </Provider>
    </QuestionEditPageWrapper>
  )
}
