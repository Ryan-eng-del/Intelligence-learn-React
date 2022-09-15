import React, { useState } from 'react'
import { Button } from 'antd'
import { ExamPageWrapper, ExamHeaderWrapper, ExamTitleWrapper} from './ExamPageStyle'
import { ExamList } from 'publicComponents/ExamPage'
import { useAddTestPaper } from 'server/fetchExam/TestPaper'
import { useNavigate } from 'react-router-dom'

export const ExamPage: React.FC = () => {
  const { mutate, data } = useAddTestPaper(()=>{
    navigate(`/editpaper/${data}`)
  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const wait = () => {
    setLoading(true)
    mutate('课程id')

  }
  return (
    <>
      <ExamPageWrapper>
        <ExamHeaderWrapper>
          <ExamTitleWrapper>
            <div className="Exam-page-title">考试作业</div>
            <Button
              type="primary"
              onClick={wait}
              style={{ marginBottom: '24px' }}
              loading={loading}
            >
              新建作业
            </Button>
          </ExamTitleWrapper>
        </ExamHeaderWrapper>
        {/* 主体内容 */}
        <ExamList></ExamList>
      </ExamPageWrapper>
    </>
  )
}
