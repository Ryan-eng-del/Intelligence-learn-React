import React, { useState } from 'react'
import { Tag, Button } from 'antd'
// import { useNavigate } from 'react-router-dom'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { ChapterTaskWrapper } from './ChapterTaskStyle'

export const ChapterTask = (props: any) => {
  const { item } = props
  const [hover, setHover] = useState(false)
  // const navigator = useNavigate()
  return (
    <>
      <ChapterTaskWrapper
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Tag color="blue">{item.tag}</Tag>
        <span>{item.name}</span>
        {hover ? (
          <div style={{ float: 'right' }}>
            <Button type="primary" icon={<EditOutlined />}>编辑</Button>&nbsp;&nbsp;
            <Button type="primary" danger icon={<CloseOutlined />}>删除</Button>
          </div>
        ) : (
          <></>
        )}
      </ChapterTaskWrapper>
    </>
  )
}
