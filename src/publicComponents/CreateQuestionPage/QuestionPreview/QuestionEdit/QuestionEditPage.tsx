import { Button } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuestionEditPageWrapper } from './QuestionEditPageStyle'
export const QuestionEditPage: React.FC = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId?: string }>()

  const save = () => {
    navigate(`/preview/${questionId}`)
  }
  return (
    <QuestionEditPageWrapper>
      {/* <Button type="primary" onClick={save}>
        保存
      </Button> */}
    </QuestionEditPageWrapper>
  )
}
