import React from 'react'
import { Form, Switch } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'

export const Judge: React.FC = () => {
  return (
    <>
        <h1>判断题</h1>
        <Form>

          <Form.Item label="题目" required>
            <TextArea
              style={{ height: '300px', overflowY: 'hidden' }}
            />
          </Form.Item>
          <Form.Item label="TrueOrFalse" required>
            <Switch checkedChildren="正确" unCheckedChildren="错误"/>
          </Form.Item>
          {/* <Footer></Footer> */}
        </Form>
    </>
  )
}
