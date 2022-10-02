import React from 'react'
import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  TitleWrapper
} from 'publicComponents/PageStyle/PageHeaderWapper'

export const DiscussPage: React.FC = () => {
  return (
    <>
      <PageWrapper>
        <HeaderWrapper>
          <TitleWrapper>
            <div className="page-title">讨论区</div>
          </TitleWrapper>
        </HeaderWrapper>
        <ContentWrapper></ContentWrapper>
      </PageWrapper>
    </>
  )
}
