import React, { useState } from 'react'
import { Form } from 'antd'
import { Footer } from '../Component/Footer'
import { TextArea } from '../Component/TextArea'
import {
  QuestionData,
  QuestionDataWithID,
  QuestionItem,
  QuestionType
} from 'server/fetchExam/types/index'

export const ShortAnswer: React.FC<{
  content: QuestionDataWithID
}> = ({ content }) => {

    //序列化为题目数据
  const [question, setQuestion] = useState({
    id: content.questionId,
    content: content.questionDescription,
    footer: {
      explanation: content.questionDescription,
      rate: content.questionDifficulty,
      knowledge: content.pointIds
    }
  })
  const handleEdit = (content: string) => {
    question.content = content
    setQuestion({ ...question })
  }
  const handleChangeFooter = (obj: any) => {
    setQuestion({ ...question, footer: obj })
  }

  return (
    <>
      <h1>简答题</h1>
      <Form>
        <Form.Item label="题目" required>
          <TextArea
            content={question.content}
            style={{ height: '300px', overflowY: 'hidden' }}
            setContent={(content: string) => handleEdit(content)}
          />
        </Form.Item>
        <Footer data={question} setter={handleChangeFooter} />
      </Form>
    </>
  )
}
