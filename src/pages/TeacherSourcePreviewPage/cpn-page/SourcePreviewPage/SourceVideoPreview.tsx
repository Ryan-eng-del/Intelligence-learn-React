import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DPlayer from 'dplayer'
import styled from 'styled-components'
import { findIdResource } from '../../../../util/TeacherSourcePreviewPage'
import { useQueryClient } from '@tanstack/react-query'

export const SourceVideoPreview = () => {
  const location = useLocation()
  const resourceId = location.pathname.split('/')[3]
  const [resource, setSource] = useState<any>(null)
  const queryClient = useQueryClient()
  console.log('video preview')
  useEffect(() => {
    const result: any = findIdResource(
      queryClient.getQueryData(['chapterTree']),
      resourceId,
      setSource
    )
    new DPlayer({
      container: document.getElementById('dplayer'),
      autoplay: false,
      loop: true,
      lang: 'zh-cn',
      screenshot: true,
      hotkey: true,
      preload: 'auto',
      volume: 0.7,
      mutex: true,
      video: {
        url: result?.resourceLink,
        type: 'auto'
      }
    })
  }, [resourceId])

  return (
    <div>
      <ResourceTitle>{resource && resource.resourceName}</ResourceTitle>
      <div id={'dplayer'} style={{ width: '943px', height: '70vh' }}></div>
    </div>
  )
}
const ResourceTitle = styled.div`
  font-size: 29px;
  margin-bottom: 12px;
`
