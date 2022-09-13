import React from 'react'
import { CreateExamHeaderWrapper } from './CreateExamHeaderStyle'
import { Button, Form, Input, Checkbox, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const CreateExamHeader: React.FC<any> = (props) => {
  const navigate = useNavigate()
  return (
    <CreateExamHeaderWrapper>
      <Space>
        <Button
          type='primary'
          shape='circle'
          onClick={()=>navigate('/classinfo/exam')}
          icon={<ArrowLeftOutlined/>}
        />
        <label>试卷名字：</label>
        <Input></Input>
        <Button  type='primary' >保存试卷</Button>
      </Space>
    </CreateExamHeaderWrapper>
  )
}
