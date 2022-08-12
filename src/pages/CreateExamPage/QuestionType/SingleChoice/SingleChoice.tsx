import React, { useState } from 'react'
import { Form, Button, Radio } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'

export const SingleChoice: React.FC = () => {
  const [question, setQuestion] = useState({
    //本页面的全部数据
    content: '',
    TrueOpttion: 'A',
    Options: [
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' }
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
  const handleChangeOption = (opt: string) => {
    setQuestion({ ...question, TrueOpttion: opt })
  }

  const handleEdit = (item: { content: string }, content: string) => {
    item.content = content
    setQuestion({ ...question })
  }

  return (
    <>
      <h1>单选题</h1>
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
        <Radio.Group
          buttonStyle="solid"
          name="option"
          value={question.TrueOpttion}
          onChange={(e) => handleChangeOption(e.target.value)}
        >
          {question.Options.map((item, index) => (
            <React.Fragment key={index + 1}>
              <Form.Item
                label={
                  <Radio.Button
                    value={String.fromCharCode(index + 65)}
                    style={{
                      borderRadius: '50%',
                      height: '30px',
                      width: '30px'
                    }}
                  >
                    {String.fromCharCode(index + 65)}
                  </Radio.Button>
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
        </Radio.Group>
        <Footer data={question.footer} setter={handleChangeFooter}></Footer>
      </Form>
    </>
  )
}
