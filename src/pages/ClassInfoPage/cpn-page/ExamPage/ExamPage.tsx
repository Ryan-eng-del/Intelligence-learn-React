import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { ExamPageWrapper } from './ExamPageStyle'
export const ExamPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log('exam', location.state)

  return (
    <div>
      <ExamPageWrapper>
        <Button type={'primary'} onClick={() => navigate('/createexam')}>
          +添加作业
        </Button>
      </ExamPageWrapper>
    </div>
  )
}
