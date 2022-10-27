import { Input} from 'antd'
import React, { ReactNode, useState } from 'react'
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
  const [ansSet,setAnsSet] = useState<string[]>([])

  const gen = (num: number) => {
    const child: ReactNode[] = []
    for (let i = 0; i < num; i++) {
      ansSet.push('')
      child.push(<Input key={i} value={ansSet[i]}
        placeholder={`第${i+1}空`}
        onChange={(v)=>{ansSet[i] = v.target.value,setAnsSet([...ansSet])}}
      ></Input>)
    }
    console.log("input parmater nomber is ", num);

    console.log("Re render one time and this array len is " , child);

    return React.createElement('div', {}, child)
  }
  const question = Network2Sutdent(content)
  console.log(question);

  return (
    <>
      <h2>题目</h2>
      {str2DOM(question.content)}
      <h2>回答</h2>
      {gen(question.AnsNum)}
    </>
  )
}
