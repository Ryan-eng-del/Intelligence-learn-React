import React, { useEffect, useState } from 'react'
import DPlayer from 'dplayer'
import styled from 'styled-components'
import { useGetResourceById } from './util'

export const SourceVideoPreview = () => {
  const [resource] = useState<any>(null)
  const { data, resourceId } = useGetResourceById()

  useEffect(() => {
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
        url: data?.resourceLink || '',
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
