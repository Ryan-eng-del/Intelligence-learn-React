import React from 'react'
import { ContentWrapper } from 'publicComponents/PageStyle/PageHeaderWapper'
import { GlobalHeader } from '../../../../publicComponents/GlobalHeader/index'

export const DiscussPage: React.FC = () => {
  return (
    <>
      <GlobalHeader title="讨论区"></GlobalHeader>
      <ContentWrapper></ContentWrapper>
    </>
  )
}
