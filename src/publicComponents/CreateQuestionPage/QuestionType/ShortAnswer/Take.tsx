import { Divider, Input } from 'antd'
import React, { useState } from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { Network2Sutdent } from './config'

export const Take: React.FC<{
  content: StudentPaperItem & {index?:number}
  setAns: (s: string) => void
}> = ({ content, setAns }) => {
  const question = Network2Sutdent(content)
  const [ans, setANS] = useState('')
  return (
    <>
      <Divider plain orientation='left'>{`第${content.index}题 - (${question.score}分)`}</Divider>
      <div style={{paddingLeft:"50px"}}>
        {str2DOM(question.content)}
      </div>
      <Divider plain orientation='left'>回答</Divider>
      <div style={{paddingLeft:"40px", margin:"10px"}}>
        <Input onChange={({target})=>setANS(target.value)}></Input>
      </div>
    </>
  )
}
