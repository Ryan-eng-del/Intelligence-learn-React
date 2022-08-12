import React, { useState } from 'react'
import { Form } from 'antd'
import { Footer } from '../Component/Footer'
import { TextArea } from '../Component/TextArea'

export const Programming: React.FC = () => {
  const [question, setQuestion] = useState({
    //本页面的全部数据
    content: '',
    footer: {
      explanation: '',
      rate: 1,
      knowledge: ['离散数学', '图论']
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
      <h1>编程题</h1>
      <Form>
        <Form.Item label="题目" required>
          <TextArea
            content={question.content}
            style={{ height: '300px', overflowY: 'hidden' }}
            setContent={(content: string) => handleEdit(content)}
          />
        </Form.Item>
        <Footer data={question.footer} setter={handleChangeFooter}></Footer>
      </Form>
    </>
  )
}
