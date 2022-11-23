import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGetResourceById } from './util'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AliYunPlayer = require('util/aliPlayer')

export const SourceVideoPreview = () => {
  const [resource] = useState<any>(null)
  const { data } = useGetResourceById()
  useEffect(() => {
    if (data) {
      new AliYunPlayer(
        {
          id: 'ali-player',
          width: '700px',
          height: '485px',
          autoplay: true,
          language: 'zh-cn',
          source: data!.resourceLink
        },
        function (player: any) {
          console.log(player, 'player')
          console.log('The player is created.')
        }
      )
    }
  }, [data])

  return (
    <div>
      <ResourceTitle>{resource && resource.resourceName}</ResourceTitle>
      <div id={'ali-player'} style={{ width: '943px', minHeight: '70vh' }}></div>
    </div>
  )
}
const ResourceTitle = styled.div`
  font-size: 29px;
  margin-bottom: 12px;
`
