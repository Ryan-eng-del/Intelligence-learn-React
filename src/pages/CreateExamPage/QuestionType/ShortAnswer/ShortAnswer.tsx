import React, { useState } from 'react'
import { Form } from 'antd'
import { Footer } from '../Component/Footer'
import { TextArea } from '../Component/TextArea'
import { QuestionData } from 'server/fetchExam/type/index'

export const ShortAnswer: React.FC = () => {
  const [question, setQuestion] = useState({
    //本页面的全部数据
    content: '',
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
      <h1>简答题</h1>
      <Form>
        <Form.Item label="题目" required>
          <TextArea
            content={question.content}
            style={{ height: '300px', overflowY: 'hidden' }}
            setContent={(content: string) => handleEdit(content)}
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
