import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Divider, Radio, Space } from 'antd'
import React from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { Network2Sutdent } from './config'

export const Take: React.FC<{
  content: StudentPaperItem & {index?:number}
  setAns: (s: string) => void
}> = ({ content, setAns }) => {
  const question = Network2Sutdent(content)
  return (
    <>
      <Divider plain orientation='left'>{`第${content.index}题 - (${question.score}分)`}</Divider>
      <div style={{paddingLeft:"50px"}}>
        {str2DOM(question.content)}
      </div>
      <Divider plain orientation='left'>回答</Divider>
      <Radio.Group
        buttonStyle='solid'
        onChange={(b) => {
          setAns(b.target.value)
        }}
      >
        <Space direction="horizontal" style={{paddingLeft:"40px", margin:"10px"}}>
          <Radio.Button value={true} ><CheckOutlined />   正确</Radio.Button>
          <Radio.Button value={false}><CloseOutlined />   错误</Radio.Button>
        </Space>
      </Radio.Group>
    </>
  )
}
