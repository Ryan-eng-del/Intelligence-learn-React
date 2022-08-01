import React from 'react'
import { Outlet } from 'react-router-dom'
import { ClassInfoRouteWrapper } from '../ClassInfoRoutePage/ClassInfoRoutePageStyle'
export const ClassInfoRoutePage = () => {
  return (
    <ClassInfoRouteWrapper>
      <Outlet />
    </ClassInfoRouteWrapper>
  )
}
