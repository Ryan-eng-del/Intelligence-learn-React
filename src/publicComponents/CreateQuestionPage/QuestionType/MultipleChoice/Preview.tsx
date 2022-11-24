import { Button, Divider, Space, Tag } from 'antd'
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
      <Divider plain orientation='left'>题目</Divider>
      {str2DOM(question.content)}
      <Divider plain orientation='left'>选项</Divider>
      {question.Options.map((i) => (
        <div key={i.optionName}>
          <Space>
          <Button
              type={ i.isTrue ? "primary" : 'default'}
              style={{width:"2.5rem",height:"2.5rem"}}
            >
              {i.optionName}
            </Button>
            {str2DOM(i.content)}
          </Space>
        </div>
      ))}
      <Divider plain orientation='left'>解析</Divider>
      {str2DOM(question.footer.explanation)}
      {question.footer.knowledge?.map((i: any) => (
        <Tag color="red" key={i}>
          {i}
        </Tag>
      ))}
    </>
  )
}
