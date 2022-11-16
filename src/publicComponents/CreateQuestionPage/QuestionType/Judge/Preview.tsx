import { Tag } from 'antd'
import React from 'react'
import { QuestionDataWithID } from 'server/fetchExam/types'

export const Preview: React.FC<{
  content: QuestionDataWithID
}> = ({ content }) => {
  const question: any = content
  const str2DOM = (str: string) => <div dangerouslySetInnerHTML={{ __html: str }} />
  return (
    <>
      <h2>题目</h2>
      {str2DOM(question.content)}
      {question.isTrue ? <h1>正确</h1> : <h1>错误</h1>}
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
