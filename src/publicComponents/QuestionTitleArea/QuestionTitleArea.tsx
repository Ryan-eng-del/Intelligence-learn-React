import React, { useEffect, useState } from 'react'
import { LabelArea, QuestionContentWrapper } from '../CreateQuestionPage/QuestionType/SingleChoice/SingleChoice'
import TextArea from 'antd/es/input/TextArea'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'

interface QuestionTitleAreaProps {
  question: IQuestionType
  handleEdit: (content: string) => void
  label: string
  questionOf: keyof IQuestionType
}

export const QuestionTitleArea = (props: QuestionTitleAreaProps) => {
  const { question, handleEdit, label, questionOf } = props
  const [textAreaValue, setTextAreaValue] = useState('')
  const handleOnChange = (value: string) => {
    handleEdit(value)
    setTextAreaValue(value)
  }

  useEffect(() => {
    setTextAreaValue(question[questionOf] as string)
  }, [question.questionId])

  return (
    <QuestionContentWrapper>
      <LabelArea>{label}</LabelArea>
      <TextArea rows={4} onChange={(e) => handleOnChange(e.target.value)} value={textAreaValue} />
    </QuestionContentWrapper>
  )
}
