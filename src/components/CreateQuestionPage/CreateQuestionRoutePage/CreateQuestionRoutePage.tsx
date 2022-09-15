import React from 'react'
import { CreateQuestionRoutePageWrapper } from './CreateQuestionRoutePageStyle'
import { Outlet } from 'react-router-dom'
import { QuestionData } from 'server/fetchExam/types'
export const CreateQuestionRoutePage: React.FC<{
  consumer:React.Consumer<QuestionData | undefined>
}> = ({consumer}) => {
  return (
    <>
      <CreateQuestionRoutePageWrapper>
        {
          // consumer
        }
      </CreateQuestionRoutePageWrapper>
    </>
  )
}
