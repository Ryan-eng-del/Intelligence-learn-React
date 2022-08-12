import React from 'react'
import {
  List,
  Tag,
  Input,
  Popconfirm,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'


export const ChapterTask = (props:any) => {
  const { item } = props
  const navigator = useNavigate()
  return (
    <>
      <div>
        <Tag color="blue">{item.tag}</Tag>
          <span>{item.name}</span>
      </div>
    </>
  )
}