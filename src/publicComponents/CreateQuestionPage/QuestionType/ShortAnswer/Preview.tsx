import { Tag } from 'antd'
import React from 'react'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { Network2Data } from './config'

export const Preview: React.FC<{
  content: QuestionDataWithID
}> = ({ content }) => {
  const question = Network2Data(content)
  return (
    <>
      <h2>题目</h2>
      {str2DOM(question.content)}

      <h2>解析</h2>
      {str2DOM(question.footer.explanation)}
      {question.footer.knowledge?.map((i: any) => (
        <Tag color="red" key={i}>
          {i}
        </Tag>
      ))}
    </>
  )
}
