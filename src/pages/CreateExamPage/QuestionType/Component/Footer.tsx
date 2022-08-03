import React from 'react'
import { Form, Rate, Button, message} from 'antd'
import { TextArea } from './TextArea';

export const Footer = () => {
  return (
    <>
      <Form.Item label="解析">
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item label="难易度">
        <Rate />
      </Form.Item>
      <Form.Item>
        <Button onClick={() => message.success("Success Save!")} htmlType="submit">
          Save
        </Button>
      </Form.Item>
      <Form.Item label="知识点">
        <Button onClick={() => message.success("打开Modal")} >
          关联知识点
        </Button>
      </Form.Item>
    </>
  )
}
