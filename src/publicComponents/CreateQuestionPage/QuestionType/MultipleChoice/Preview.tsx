import { Button, Divider, Space, Tag } from 'antd'
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
      <Divider plain orientation="left">
        题目
      </Divider>
      {str2DOM(content.questionDescription)}
      <Divider plain orientation="left">
        选项
      </Divider>
      {content.questionOption
        .split('<>')
        .map((i, x) => ({
          optionName: String.fromCharCode(x + 65),
          content: i,
          isTrue: true
        }))
        .map((i) => (
          <div key={i.optionName}>
            <Space>
              <Button type={i.isTrue ? 'primary' : 'default'} style={{ width: '2.5rem', height: '2.5rem' }}>
                {i.optionName}
              </Button>
              {str2DOM(i.content)}
            </Space>
          </div>
        ))}
      <Divider plain orientation="left">
        解析
      </Divider>
      {str2DOM(content.questionAnswerExplain)}
      {content.points.map((i: any) => (
        <Tag color="red" key={i}>
          {i}
        </Tag>
      ))}
    </>
  )
}
