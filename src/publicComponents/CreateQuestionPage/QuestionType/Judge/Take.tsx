import { Radio, Space } from 'antd'
import React from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { Network2Sutdent } from './config'

export const Take: React.FC<{
  content: StudentPaperItem
  setAns: (s: string) => void
}> = ({ content, setAns }) => {
  const question = Network2Sutdent(content)
  return (
    <>
      <h2>题目</h2>
      {str2DOM(question.content)}
      <Radio.Group
        onChange={(b) => {
          setAns(b.target.value)
        }}
      >
        <Space direction="vertical">
          <Radio value={true}>正确</Radio>
          <Radio value={false}>错误</Radio>
        </Space>
      </Radio.Group>
    </>
  )
}
