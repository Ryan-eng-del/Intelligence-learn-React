import React from 'react'
import { useGetResourceById } from './util'

export const SourceImgPreview = () => {
  const { data } = useGetResourceById()
  return (
    <div>
      <img src={data?.resourceLink} />
    </div>
  )
}
