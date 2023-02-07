import { Divider } from 'antd'
import React from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'

export const Take: React.FC<{
  content: StudentPaperItem & { index?: number }
  NoScore?: boolean
  order: number
}> = ({ content, NoScore, order }) => {
  return (
    <>
      <div className="questionTitle">
        {`${order}.`}
        {str2DOM(content.questionDescription)}
      </div>
      <Divider plain orientation="left">
        回答
      </Divider>
      <div style={{ paddingLeft: '40px', margin: '10px' }}>
        {/* <Input onChange={({ target }) => setAns(target.value)}></Input> */}
      </div>
    </>
  )
}
