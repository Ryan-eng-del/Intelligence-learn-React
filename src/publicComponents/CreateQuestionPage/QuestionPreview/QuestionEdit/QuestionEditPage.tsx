import { Button } from 'antd'
import {
  FillBlank,
  Judge,
  MultipleChoice,
  Programming,
  ShortAnswer,
  SingleChoice
} from 'publicComponents/CreateQuestionPage'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowQuestionDetails } from 'server/fetchExam'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { QuestionEditPageWrapper } from './QuestionEditPageStyle'
export const QuestionEditPage: React.FC = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId?: string }>()
  console.log('questionid', questionId)
  //请求对应的数据
  const { data } = useShowQuestionDetails(questionId)
  console.log(data)

  const save = () => {
    navigate(`/preview/${questionId}`)
  }

  const curEdit: QuestionDataWithID = {
    questionId,
    questionDescription: data?.questionDescription || '',
    courseId: '',
    pointIds: data?.pointIds || [],
    questionOption: data?.questionOption || '',
    questionAnswerExplain: data?.questionAnswerExplain || '',
    questionAnswerNum: data?.questionAnswerNum || 1,
    questionDifficulty: data?.questionDifficulty || 1,
    questionType: data?.questionType || 0,
    rightAnswer: data?.rightAnswer || ''
  }

  return (
    <QuestionEditPageWrapper>
      <Button
        type="primary"
        onClick={() => {
          navigate('/classinfo/questionbank')
        }}
      >
        返回
      </Button>
      {curEdit.questionType === 0 ? (
        <SingleChoice content={curEdit!}></SingleChoice>
      ) : curEdit.questionType === 1 ? (
        <MultipleChoice content={curEdit!}></MultipleChoice>
      ) : curEdit.questionType === 2 ? (
        <Judge content={curEdit!}></Judge>
      ) : curEdit.questionType === 3 ? (
        <FillBlank content={curEdit!}></FillBlank>
      ) : (
        <></>
      )}
    </QuestionEditPageWrapper>
  )
}
