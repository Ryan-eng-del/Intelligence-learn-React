import { Input} from 'antd'
import React, { ReactNode } from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { Network2Sutdent } from './config'

// 以此为例，
// 需要展示 题目 选项 分值
// 请更改传入类型
export const Take: React.FC<{
  content: StudentPaperItem
  setAns: (s: string) => void
}> = ({ content }) => {
  const gen = (num: number) => {
    const child: ReactNode[] = []
    for (let i = 0; i < num; i++) {
      child.push(<Input></Input>)
    }
    return React.createElement('Input', {}, child)
  }
  const question = Network2Sutdent(content)
  return (
    <>
      <h2>题目</h2>
      {str2DOM(question.content)}
      <h2>回答</h2>
      {gen(question.AnsNum)}
    </>
  )
}
