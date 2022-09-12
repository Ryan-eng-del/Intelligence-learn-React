import React from 'react'
import { useNavigate } from 'react-router-dom'
import { QuestionPreviewPageWrapper } from './QuestionPreviewPageStyle'
import { QuestionPreview } from 'publicComponents/CreateQuestionPage'
export const QuestionPreviewPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <QuestionPreviewPageWrapper>
        <button
          onClick={() => {
            navigate('/questionbank')
          }}
        >
          返回
        </button>
        <QuestionPreview></QuestionPreview>
      </QuestionPreviewPageWrapper>
    </>
  )
}
