import React from 'react'
import { ContentWrapper, HeaderWrapper, TitleWrapper } from 'publicComponents/PageStyle/PageHeaderWapper'
import { useNavigate } from 'react-router-dom'
import { ExamList } from 'publicComponents/ExamPage'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { PrimaryButton } from '../../../../publicComponents/Button/index'
import { GlobalRightLayout } from '../../../../publicComponents/GlobalLayout/index'

export const ExamPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <GlobalHeader
        title="考试作业"
        tool={<PrimaryButton title="添加考试" handleClick={() => navigate('/editpaper/1')}></PrimaryButton>}
      ></GlobalHeader>
      <GlobalRightLayout>
        <ContentWrapper>
          <ExamList></ExamList>
        </ContentWrapper>
      </GlobalRightLayout>
    </>
  )
}
