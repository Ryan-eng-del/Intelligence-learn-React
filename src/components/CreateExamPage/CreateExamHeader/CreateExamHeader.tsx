import React from 'react'
import { CreateExamHeaderWrapper } from './CreateExamHeaderStyle'
import { Button, Form, Input, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
export const CreateExamHeader: React.FC<any> = (props) => {
  const { state } = props
  const navigate = useNavigate()
  return (
    <CreateExamHeaderWrapper>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 4 }}
        initialValues={
          {
            /* 初始值 */
          }
        }
        onFinish={() => {
          console.log()
        }}
        onFinishFailed={() => {
          console.log()
        }}
        autoComplete="off"
      >
        <Form.Item
          label="试卷名字"
          name="examname"
          rules={[{ required: true, message: '请输入试卷名字' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="displayScore"
          valuePropName="checked"
          wrapperCol={{ offset: 2, span: 16 }}
        >
          <Checkbox>完成后允许查看分数</Checkbox>
        </Form.Item>

        <Form.Item
          name="shuffle"
          valuePropName="checked"
          wrapperCol={{ offset: 2, span: 16 }}
        >
          <Checkbox>打乱选项顺序</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => navigate('/classinfo/exam', { state })}
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </CreateExamHeaderWrapper>
  )
}
