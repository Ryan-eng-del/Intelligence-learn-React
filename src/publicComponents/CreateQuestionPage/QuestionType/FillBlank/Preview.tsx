import { Tag } from 'antd'
import React from 'react'
import { QuestionDataWithID } from 'server/fetchExam/types'

export const Preview: React.FC<{
  content: QuestionDataWithID
  No?: number
}> = ({ content, No }) => {
  const str2DOM = (str: string) => <div dangerouslySetInnerHTML={{ __html: str }} />
  return (
    <>
      {No ? <h1>{No.toString()}.</h1> : <></>}
      <h2>题目</h2>
      {str2DOM(content.questionDescription)}
      <h2>解析</h2>
      {content.rightAnswer ? <h1>主观填空</h1> : content.questionOption.split('<>').map((i: any) => str2DOM(i.content))}
      <h2>解析</h2>
      {str2DOM(content.questionAnswerExplain)}
      {content.points.map((i: any) => (
        <Tag color="red" key={i}>
          {i}
        </Tag>
      ))}
    </>
  )
}
