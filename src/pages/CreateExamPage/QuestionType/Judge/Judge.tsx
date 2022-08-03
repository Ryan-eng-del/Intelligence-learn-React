import React, { useState } from 'react'
import { Form, Switch } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'

export const Judge: React.FC = () => {
  const [question,setQuestion] = useState({   //本页面的全部数据
    content: '',
    isTrue: true,
    footer: {
      explanation: '',
      rate: 1,
      knowledge: ["离散数学","图论"]
    }
  })
  const handleEdit = (content: string) => {
    question.content = content;
    setQuestion({...question});
  }
  const handleChangeFooter = (obj: any) => {
    setQuestion({...question,footer:obj})
  }
  return (
    <>
        <h1>判断题</h1>
        <Form>

          <Form.Item label="题目" required>
            <TextArea
                  content={question.content}
                  style={{ height: '300px', overflowY: 'hidden' }}
                  setContent={(content:string)=>handleEdit(content)} />
          </Form.Item>
          <Form.Item label="正确答案" required>
            <Switch checkedChildren="对" unCheckedChildren="错" checked={question.isTrue}
              onChange={(e)=>setQuestion({...question,isTrue:e})}/>
          </Form.Item>
          <Footer data={question.footer} setter={handleChangeFooter}></Footer>
        </Form>
    </>
  )
}
