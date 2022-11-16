import React, {useState} from 'react'
import {Button} from 'antd'
import {ExamList} from 'publicComponents/ExamPage'
import {useNavigate} from 'react-router-dom'
import {
  ContentWrapper,
  HeaderWrapper,
  TitleWrapper
} from 'publicComponents/PageStyle/PageHeaderWapper'

export const TeacherExamPage: React.FC<{ classId: string }> = (classId) => {

  const navigate = useNavigate()

  return (
    <>
      <HeaderWrapper>
        <TitleWrapper>
          <div className="page-title">考试作业</div>
          <Button
            type="primary"

          >
            新建作业
          </Button>
        </TitleWrapper>
      </HeaderWrapper>
      {/* 主体内容 */}
      <ContentWrapper>
        <ExamList></ExamList>
      </ContentWrapper>
    </>
  )
}
