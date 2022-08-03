import React from 'react'
import { CreateExamRoutePageWrapper } from './CreateExamRoutePageStyle'
import { Outlet } from 'react-router-dom'

export const CreateExamRoutePage: React.FC = () => {
  return (
    <CreateExamRoutePageWrapper>
      <Outlet />
    </CreateExamRoutePageWrapper>
  )
}
