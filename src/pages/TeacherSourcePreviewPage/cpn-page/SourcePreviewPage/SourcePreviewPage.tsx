import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMount } from '../../../../hook/useMount'
import DPlayer from 'dplayer'
import styled from 'styled-components'
import { findIdResource } from '../../../../util/TeacherSourcePreviewPage'
import { useQueryClient } from '@tanstack/react-query'

export const SourcePreviewPage = () => {
  const location = useLocation()
  console.log(location, 'pathName')
  const resourceId = location.pathname.split('/')[2]
  const [resource, setSource] = useState<any>(null)
  const queryClient = useQueryClient()

  useMount(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    findIdResource(
      queryClient.getQueryData(['chapterTree']),
      resourceId,
      setSource
    )
    new DPlayer({
      container: document.getElementById('dplayer'),
      autoplay: false,
      theme: '#FADFA3',
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
        pic: 'dplayer.png',
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
