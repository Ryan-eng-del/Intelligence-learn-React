import { HighlightOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'
const { Paragraph } = Typography

export const EditableText: React.FC<{
  text: string
  onChange: (text: string) => void
}> = ({ text, onChange }) => {
  return (
    <Paragraph
      editable={{
        icon: <HighlightOutlined />,
        tooltip: '点击修改',
        onChange: onChange,
        enterIcon: null
      }}
    >
      {text}
    </Paragraph>
  )
}
