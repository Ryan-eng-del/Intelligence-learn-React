import { Button, Divider, Space, Tag } from 'antd'
import React from 'react'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { FooterWapper, QuestionWapper } from '../style'

export const Preview: React.FC<{
  content: QuestionDataWithID
  No?: number
}> = ({ content, No }) => {
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        {No ? <b style={{ fontSize: '20px' }}> {No.toString()}.</b> : <></>}&nbsp;&nbsp;
        <QuestionWapper>{str2DOM(content.questionDescription)}</QuestionWapper>
      </div>
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
      <FooterWapper>
        <div className="d">解析：{str2DOM(content.questionAnswerExplain)}</div>
        <div className="p">
          相关知识点：
          {content.points.map((i: any) => (
            <Tag color="rgb(150, 151, 164)" key={i}>
              {i}
            </Tag>
          ))}
        </div>
        <div className="r">难易度：{['简单', '中等', '困难'][content.questionDifficulty]}</div>
      </FooterWapper>
    </>
  )
}
