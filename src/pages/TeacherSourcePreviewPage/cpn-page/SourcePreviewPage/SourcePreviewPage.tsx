import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMount } from '../../../../hook/useMount'
import DPlayer from 'dplayer'
import styled from 'styled-components'
import { findIdResource } from '../../../../util/TeacherSourcePreviewPage'
import { useQueryClient } from '@tanstack/react-query'

export const SourcePreviewPage = () => {
  const location = useLocation()
  const resourceId = location.pathname.split('/')[2]
  const [resource, setSource] = useState<any>(null)
  const queryClient = useQueryClient()
  useEffect(() => {
    findIdResource(
      queryClient.getQueryData(['chapterTree']),
      resourceId,
      setSource
    )
  }, [resourceId])
  useMount(() => {
    new DPlayer({
      container: document.getElementById('dplayer'),
      autoplay: false,
      loop: true,
      lang: 'zh-cn',
      screenshot: true,
      hotkey: true,
      preload: 'auto',
      logo: 'logo.png',
      volume: 0.7,
      mutex: true,
      video: {
        url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
        pic: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnails: 'thumbnails.jpg',
        type: 'auto'
      }
    })
  })

  return (
    <div>
      <ResourceTitle>{resource && resource[0].name}</ResourceTitle>
      <div id={'dplayer'} style={{ width: '943px', height: '70vh' }}></div>
    </div>
  )
}
const ResourceTitle = styled.div`
  font-size: 29px;
  margin-bottom: 12px;
`
