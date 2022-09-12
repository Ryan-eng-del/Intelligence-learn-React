import React from 'react'
import { CreateQuestionRoutePageWrapper } from './CreateQuestionRoutePageStyle'
import { Outlet } from 'react-router-dom'
export const CreateQuestionRoutePage: React.FC = () => {
  return (
    <>
      <CreateQuestionRoutePageWrapper>
        <Outlet />
      </CreateQuestionRoutePageWrapper>
    </>
  )
}
