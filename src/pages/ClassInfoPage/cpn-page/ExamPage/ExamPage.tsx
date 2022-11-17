import React, { useState } from 'react'
import {
  ContentWrapper,
  HeaderWrapper,
  PageWrapper,
  TitleWrapper
} from 'publicComponents/PageStyle/PageHeaderWapper'
import { useAddTestPaper } from 'server/fetchExam/TestPaper'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { ExamList } from 'publicComponents/ExamPage'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ExamList } from 'publicComponents/ExamPage'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { PrimaryButton } from '../../../../publicComponents/Button/index'
import { GlobalRightLayout } from '../../../../publicComponents/GlobalLayout/index'

export const ExamPage: React.FC = () => {
  const { mutate } = useAddTestPaper((id: string) => {
    navigate(`/editpaper/${id}`)
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <PageWrapper>
        <HeaderWrapper>
          <TitleWrapper>
            <div className="page-title">考试作业</div>
            <Button type="primary" onClick={wait} loading={loading}>
              新建作业
            </Button>
          </TitleWrapper>
        </HeaderWrapper>
        {/* 主体内容 */}
        <ContentWrapper>
          <CurCourseProvider>
            {({ curCourse }) => (
              <ExamList courseId={curCourse.courseId} />

            )}
          </CurCourseProvider>
        </ContentWrapper>
      </PageWrapper>
      <GlobalHeader
        title="考试作业"
        tool={<PrimaryButton title="添加考试" handleClick={() => navigate('/editpaper/1')}></PrimaryButton>}
      ></GlobalHeader>
      <GlobalRightLayout>
        <ExamList></ExamList>
      </GlobalRightLayout>
    </>
  )
}
