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

export const ExamPage: React.FC = () => {
  const { mutate } = useAddTestPaper((id: string) => {
    navigate(`/editpaper/${id}`)
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const wait = () => {
    setLoading(true)
    mutate('课程id')
  }
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
    </>
  )
}
