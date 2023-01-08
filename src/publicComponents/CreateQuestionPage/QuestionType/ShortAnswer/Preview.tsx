import { Tag } from 'antd'
import React from 'react'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'

export const Preview: React.FC<{
  content: QuestionDataWithID
  No?: number
}> = ({ content, No }) => {
  return (
    <>
      {No ? <h1>{No.toString()}.</h1> : <></>}
      <h2>题目</h2>
      {str2DOM(content.questionDescription)}
      {content.rightAnswer == '1' ? <h1>正确</h1> : <h1>错误</h1>}
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
