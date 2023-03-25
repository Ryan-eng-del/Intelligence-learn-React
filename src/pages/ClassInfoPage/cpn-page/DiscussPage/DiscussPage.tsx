import { EmptyPage } from 'pages/EmptyPages/EmptyPage'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import React from 'react'

const DiscussPage: React.FC = () => {
  return (
    <>
      <GlobalHeader
        title="讨论区"
        tool={<PrimaryButton title="创建话题" handleClick={() => console.log('还没有做')}></PrimaryButton>}
      ></GlobalHeader>
      <GlobalRightLayout>
        <EmptyPage description="等待开放..." />
      </GlobalRightLayout>
    </>
  )
}

export default DiscussPage
