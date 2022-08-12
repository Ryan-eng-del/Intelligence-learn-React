import React, { useState } from 'react'
import { Form, Button } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'

export const MultipleChoice: React.FC = () => {
  const [question, setQuestion] = useState({
    content: '',
    Options: [
      { isTrue: true, content: '' },
      { isTrue: false, content: '' },
      { isTrue: false, content: '' },
      { isTrue: false, content: '' }
    ],
    footer: {
      explanation: '',
      rate: 1,
      knowledge: ['离散数学', '图论']
    }
  })

  const handleChangeFooter = (obj: any) => {
    setQuestion({ ...question, footer: obj })
  }
  const handleChangeOption = (item: { isTrue: boolean }) => {
    item.isTrue = !item.isTrue
    setQuestion({ ...question })
  }

  const handleEdit = (item: { content: string }, content: string) => {
    item.content = content
    setQuestion({ ...question })
  }
  return (
    <>
      <h1>多选题</h1>
      <Button
        onClick={() => {
          console.log(question)
        }}
      >
        控制台输出题目详情
      </Button>
      <Form>
        <Form.Item label="题目" required>
          <TextArea
            content={question.content}
            style={{ height: '300px', overflowY: 'hidden' }}
            setContent={(content: string) => handleEdit(question, content)}
          />
        </Form.Item>
        {question.Options.map((item, index) => (
          <React.Fragment key={index + 1}>
            <Form.Item
              label={
                <Button
                  type={item.isTrue ? 'primary' : 'default'}
                  onClick={() => handleChangeOption(item)}
                  style={{ borderRadius: '10%', height: '30px', width: '30px' }}
                >
                  {String.fromCharCode(index + 65)}
                </Button>
              }
            >
              <TextArea
                style={{
                  height: '50px',
                  overflowY: 'hidden',
                  minWidth: '1100px'
                }}
                content={item.content}
                setContent={(content: string) => handleEdit(item, content)}
              />
            </Form.Item>
          </React.Fragment>
        ))}
        <Footer data={question.footer} setter={handleChangeFooter}></Footer>
      </Form>
    </>
  )
}
