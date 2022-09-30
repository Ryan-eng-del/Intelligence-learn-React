import React, { useState } from 'react'
import { Form, Switch } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'
import {
  QuestionData,
  QuestionDataWithID,
  QuestionItem
} from 'server/fetchExam/types/index'

export const Judge: React.FC<{
  content: QuestionDataWithID
}> = ({ content }) => {

  //序列化为题目数据
  const [question, setQuestion] = useState({
    id: content.questionId,
    content: content.questionDescription,
    TrueOption: content.rightAnswer ,
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
      <h1>判断题</h1>
      <Form>
        <Form.Item label="题目" required>
          <TextArea
            content={question.content}
            style={{ height: '300px', overflowY: 'hidden' }}
            setContent={(content: string) => handleEdit(content)}
          />
        </Form.Item>
        <Form.Item label="正确答案" required>
          <Switch
            checkedChildren="对"
            unCheckedChildren="错"
            checked={question.TrueOption == 'true'}
            onChange={(e) =>
              setQuestion({ ...question, TrueOption: e.toString() })
            }
          />
        </Form.Item>
        <Footer data={question} setter={handleChangeFooter} />
      </Form>
    </>
  )
}
