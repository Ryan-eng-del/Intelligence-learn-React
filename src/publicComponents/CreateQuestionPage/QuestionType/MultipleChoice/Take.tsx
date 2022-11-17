import { Button, Space } from 'antd'
import React, { useState } from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { Network2Sutdent } from './config'

// 以此为例，
// 需要展示 题目 选项 分值
// 请更改传入类型
type optionType = "A" | "B" | "C" | "D"
export const Take: React.FC<{
  content: StudentPaperItem
  setAns: (s: string) => void
}> = ({ content, setAns }) => {
  const question = Network2Sutdent(content)
  const [ans, setANS] = useState({A:false,B:false,C:false,D:false})
  const set = (ABCD:optionType ) => {
    ans[ABCD] = !ans[ABCD]
    setANS({...ans})
    setAns(ABCD)
  }
  return (
    <>
      <h2>题目</h2>
      {str2DOM(question.content)}
      <h2>选项</h2>
      {question.Options.map((i:any) => (
        <div key={i.optionName}>
          <Space>
            <Button
              type={ans[i.optionName as optionType] ? 'primary' : 'default'}
              onClick={() => set(i.optionName as optionType)}
            >
              {i.optionName}
            </Button>
            {str2DOM(i.content)}
          </Space>
        </div>
      ))}
    </>
  )
}
