import React, { useState } from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { TextArea } from '../Component/TextArea'
import { Network2Sutdent } from './config'

export const Take: React.FC<{
  content: StudentPaperItem
  setAns: (s: string) => void
}> = ({ content, setAns }) => {
  const question = Network2Sutdent(content)
  const [ans, setANS] = useState('')
  return (
    <>
      <h2>题目</h2>
      {str2DOM(question.content)}

      <h2>回答</h2>
      <TextArea
        setContent={(c: string) => {
          setANS(c), setAns(c)
        }}
        content={ans}
      ></TextArea>
    </>
  )
}
