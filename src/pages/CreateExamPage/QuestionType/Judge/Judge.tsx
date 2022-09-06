import React, { useState } from 'react'
import { Form, Switch } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'
import { QuestionData } from 'server/fetchExam/types/index'

export const Judge: React.FC = () => {
  const [question, setQuestion] = useState({
    //本页面的全部数据
    content: '',
    isTrue: true,
    footer: {
      explanation: '',
      rate: 1,
      knowledge: ['离散数学', '图论'],
      score: 0
    }
  })
  const handleEdit = (content: string) => {
    question.content = content
    setQuestion({ ...question })
  }
  const handleChangeFooter = (obj: any) => {
    setQuestion({ ...question, footer: obj })
  }

  const RandomInt = () => Math.floor(Math.random() * 1e9)

  const networkData: QuestionData = {
    course_id: RandomInt.toString(), //要改
    point_ids: question.footer.knowledge,
    question_answer: '11',
    question_answer_description: question.footer.explanation,
    question_answer_num: 1,
    question_description: question.content,
    question_difficulty: question.footer.rate,
    question_type: 0,
    right_answer: ''
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
            checked={question.isTrue}
            onChange={(e) => setQuestion({ ...question, isTrue: e })}
          />
        </Form.Item>
        <Footer
          networkData={networkData}
          data={question.footer}
          setter={handleChangeFooter}
        ></Footer>
      </Form>
    </>
  )
}
