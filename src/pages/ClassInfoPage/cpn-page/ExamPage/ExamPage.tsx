import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import {
  ExamPageWrapper,
  ExamHeaderWrapper,
  ExamTitleWrapper
} from './ExamPageStyle'
import { ExamList } from 'publicComponents/ExamPage'
import { useMount } from '../../../../hook/useMount'

export const ExamPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.state)
  useMount(() => {
    console.log('作业考试 onMount')
  })
  return (
    <>
      <ExamPageWrapper>
        <ExamHeaderWrapper>
          <ExamTitleWrapper>
            <div className="Exam-page-title">考试作业</div>
            <Button
              type="primary"
              onClick={() => navigate('/createexam')}
              style={{ marginBottom: '24px' }}
            >
              +新建作业
            </Button>
          </ExamTitleWrapper>
        </ExamHeaderWrapper>
        {/* 主体内容 */}
        <ExamList></ExamList>
      </ExamPageWrapper>
    </>
  )
}
