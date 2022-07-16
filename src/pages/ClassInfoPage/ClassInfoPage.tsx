import React from 'react'
import { useLocation } from 'react-router-dom'

export const ClassInfoPage = () => {
  const location = useLocation()
  const state: any = location.state
  return (
    <>
      ClassInfo ClassInfo
      <div>{state.id}</div>
      <div>{state.cname}</div>
      <div>{state.tname}</div>
      <div>{state.iurl}</div>
    </>
  )
}
