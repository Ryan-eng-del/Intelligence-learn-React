import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Divider, Radio, Space } from 'antd'
import React from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'

export const Take: React.FC<{
  content: StudentPaperItem & { index?: number }
  setAns: (s: string) => void
  NoScore?: boolean
}> = ({ content, setAns, NoScore }) => {
  return (
    <>
      {!NoScore && <Divider plain orientation='left'>{`第${content.index}题 - (${content.questionScore}分)`}</Divider>}
      <div className='questionTitle'>
        {str2DOM(content.questionDescription)}
      </div>
      <Divider plain orientation='left'>回答</Divider>
      <Radio.Group
        buttonStyle="solid"
        onChange={(b) => {
          setAns(b.target.value)
        }}
      >
        <Space direction="horizontal" style={{ paddingLeft: '40px', margin: '10px' }}>
          <Radio.Button value={true}>
            <CheckOutlined /> 正确
          </Radio.Button>
          <Radio.Button value={false}>
            <CloseOutlined /> 错误
          </Radio.Button>
        </Space>
      </Radio.Group>
    </>
  )
}
