import React from 'react'
import { useGetResourceById } from './util'
import { BaseSpin } from 'baseUI/BaseSpin/BaseSpin'

const SourceImgPreview = () => {
  const { data, isLoading } = useGetResourceById()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', minHeight: '380px' }}>
      {isLoading ? <BaseSpin title={'图片加载中'} /> : <img src={data?.resourceLink} style={{ width: '80%' }} />}
    </div>
  )
}

export default SourceImgPreview
