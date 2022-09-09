import React from 'react'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { useMount } from '../../hook/useMount'

import styled from 'styled-components'

export const TeacherSourcePreviewPage = () => {
  const location = useLocation()
  const resourceId = location.pathname.split('/')[2]
  const setParams = useSearchParams()[1]
  useMount(() => {
    setParams({ source_id: resourceId }, { replace: true })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  })

  return (
    <>
      <TeachPreviewWrapper>
        <PreviewContentWrapper>目录树</PreviewContentWrapper>
        <Outlet />
      </TeachPreviewWrapper>
    </>
  )
}
const TeachPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const PreviewContentWrapper = styled.div`
  margin-right: 100px;
`
