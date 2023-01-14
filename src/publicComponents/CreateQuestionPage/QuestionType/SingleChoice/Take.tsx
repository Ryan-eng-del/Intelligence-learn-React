import { Button, Divider, Space } from 'antd'
import React, { useState } from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import "../QuestionStyle.css"

// 以此为例，
// 需要展示 题目 选项 分值
// 请更改传入类型
export const Take: React.FC<{
  content: StudentPaperItem & { index?: number }
  setAns: (s: string) => void
  NoScore?: boolean
}> = ({ content, setAns, NoScore }) => {
  const [TrueOption, setTrueOption] = useState('')
  const color = (i: any) =>
    i.optionName == TrueOption ? 'linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%)' : undefined
  const Opt = content.questionOption.split('<>').map((i, x) => ({
    optionName: String.fromCharCode(x + 65),
    content: i
  }))
  return (
    <>
      {!NoScore && <Divider plain orientation="left">{`第${content.index}题 - (${content.questionScore}分)`}</Divider>}
      <div className='questionTitle'>{str2DOM(content.questionDescription)}</div>
      {/* <Divider plain orientation="left">
        选项
      </Divider> */}
      {Opt.map((i) => (
        <div key={i.optionName} style={{ margin: '10px' }}>
          <Space>
            <Button
              type={i.optionName == TrueOption ? 'primary' : 'default'}
              shape="circle"
              onClick={() => (setAns(i.optionName), setTrueOption(i.optionName))}
              style={{ width: '2.5rem', height: '2.5rem', background: color(i) }}
            >
              {i.optionName}
            </Button>
            {str2DOM(i.content)}
          </Space>
        </div>
      ))}
    </>
  )
}
