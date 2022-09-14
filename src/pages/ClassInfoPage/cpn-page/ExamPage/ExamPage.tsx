import React, { useState } from 'react'
import { Button } from 'antd'
import { ExamPageWrapper, ExamHeaderWrapper, ExamTitleWrapper} from './ExamPageStyle'
import { ExamList } from 'publicComponents/ExamPage'
import { useAddTestPaper } from 'server/fetchExam/TestPaper'

export const ExamPage: React.FC = () => {
  const { mutate } = useAddTestPaper('课程id')
  const [loading,setLoading] = useState(false)
  return (
    <>
      <ExamPageWrapper>
        <ExamHeaderWrapper>
          <ExamTitleWrapper>
            <div className="Exam-page-title">考试作业</div>
            <Button
              type="primary"
              onClick={()=>(setLoading(true),mutate())}
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
