import React from 'react'
import { Form } from 'antd'
import { Footer } from '../Component/Footer'
import { TextArea } from '../Component/TextArea'

export const Programming: React.FC = () => {
  return (
    <>
      <h1>编程题</h1>
      <Form>
        <Form.Item label="题目" required>
          <TextArea></TextArea>
        </Form.Item>

        {/* <Footer></Footer> */}
      </Form>
    </>
  )
}
