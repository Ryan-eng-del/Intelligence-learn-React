import React, { useState } from 'react'
import { Button } from 'antd'
import { ExamList } from 'publicComponents/ExamPage'
import { useAddTestPaper } from 'server/fetchExam/TestPaper'
import { useNavigate } from 'react-router-dom'
import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  TitleWrapper
} from 'publicComponents/PageStyle/PageHeaderWapper'
export const ExamPage: React.FC = () => {
  const { mutate, data } = useAddTestPaper(() => {
    navigate(`/editpaper/${data}`)
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
          <ExamList></ExamList>
        </ContentWrapper>
      </PageWrapper>
    </>
  )
}
