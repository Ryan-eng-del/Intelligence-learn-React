import React, { useState } from 'react'
import { Form } from 'antd'
import { QuestionDataWithID } from 'server/fetchExam/types/index'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { StateSetter } from 'types'
import { QuestionTitleArea } from 'publicComponents/QuestionTitleArea/QuestionTitleArea'
import { QuestionFooter } from '../QuestionFooter'

export const ShortAnswer: React.FC<{
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}> = ({ question, dispatchQuestionType, setCurEditQuestion }) => {
  /* 处理单选题编辑题干 */
  const handleEditTitle = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionDescription' } })
  }
  return (
    <>
      <Form>
        <QuestionTitleArea
          question={question}
          handleEdit={(content: string) => handleEditTitle(content, question.questionId)}
          label={'题干'}
          questionOf={'questionDescription'}
        />
        <QuestionFooter
          question={question}
          setCurEditQuestion={setCurEditQuestion}
          dispatchQuestionType={dispatchQuestionType}
        />
      </Form>
    </>
  )
}
