import React, { useState } from 'react'
import { Form } from 'antd'
import { Footer } from '../Component/Footer'
import { TextArea } from '../Component/TextArea'
import { QuestionData } from 'server/fetchExam/types/index'

export const Programming: React.FC = () => {
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
    courseId: RandomInt.toString(),
    pointIds: question.footer.knowledge,
    questionAnswerDescription: question.footer.explanation,
    questionAnswerNum: 1,
    questionDescription: question.content,
    questionDifficulty: question.footer.rate,
    questionType: 0,
    rightAnswer: ''
  }

  return (
    <>
      <h1>编程题</h1>
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
