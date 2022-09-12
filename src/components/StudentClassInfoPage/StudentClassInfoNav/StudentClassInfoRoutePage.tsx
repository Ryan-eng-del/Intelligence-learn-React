import React from 'react'
import { Outlet } from 'react-router-dom'
import { ClassInfoRouteWrapper } from '../StudentClassInfoRoutePage/StudentClassInfoRoutePageStyle'
export const StudentClassInfoRoutePage = () => {
  return (
    <ClassInfoRouteWrapper>
      <Outlet />
    </ClassInfoRouteWrapper>
  )
}
