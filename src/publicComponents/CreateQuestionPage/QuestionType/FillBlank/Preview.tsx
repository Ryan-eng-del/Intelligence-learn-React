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
      <h2>解析</h2>
      {question.isSubjective ? <h1>主观填空</h1> : question.Options.map((i: any) => str2DOM(i.content))}
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
