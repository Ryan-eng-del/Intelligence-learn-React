import { Divider, Input } from 'antd'
import React from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'

export const Take: React.FC<{
  content: StudentPaperItem & { index?: number }
  setAns: (s: string) => void
  NoScore?: boolean
}> = ({ content, setAns, NoScore }) => {
  return (
    <>
      {!NoScore && <Divider plain orientation='left'>{`第${content.index}题 - (${question.score}分)`}</Divider>}
      <div className='questionTitle'>
        {str2DOM(question.content)}
      </div>
      <Divider plain orientation='left'>回答</Divider>
      <div style={{paddingLeft:"40px", margin:"10px"}}>
        <Input onChange={({target})=>setAns(target.value)}></Input>
      </div>
    </>
  )
}
