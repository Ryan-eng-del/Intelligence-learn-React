import React from 'react'
import { CreateExamHeaderWrapper } from './CreateExamHeaderStyle'
import { Button, Form, Input, Checkbox, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const CreateExamHeader: React.FC<{
  name?: string
  id?: string
}> = ({ name, id }) => {
  const navigate = useNavigate()
  return (
    <CreateExamHeaderWrapper>
      <Space>
        <Button
          type="primary"
          shape="circle"
          onClick={() => navigate(-1)}
          icon={<ArrowLeftOutlined />}
        />
        <label>试卷名字：</label>
        <Input defaultValue={name}></Input>
        <Button type="primary">保存试卷</Button>
        <Button type="primary" onClick={()=>navigate(`/previewtestpaper/${id}`)}>Preview</Button>
        <span>ID:{id}</span>
      </Space>
    </CreateExamHeaderWrapper>
  )
}
