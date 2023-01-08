import { Button, Divider, Space } from 'antd'
import React, { useState } from 'react'
import { StudentPaperItem } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'

// 以此为例，
// 需要展示 题目 选项 分值
// 请更改传入类型
type optionType = 'A' | 'B' | 'C' | 'D'
export const Take: React.FC<{
  content: StudentPaperItem & { index?: number }
  setAns: (s: string) => void
  NoScore?: boolean
}> = ({ content, setAns, NoScore }) => {
  const [ans, setANS] = useState({ A: false, B: false, C: false, D: false })
  const set = (ABCD: optionType) => {
    ans[ABCD] = !ans[ABCD]
    setANS({ ...ans })
    setAns(ABCD)
  }
  const color = (i: any) =>
    ans[i.optionName as optionType] ? 'linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%)' : undefined
  return (
    <>
      {!NoScore && <Divider plain orientation="left">{`第${content.index}题 - (${content.questionScore}分)`}</Divider>}
      <div style={{ paddingLeft: '50px' }}>{str2DOM(content.questionDescription)}</div>
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
          <div key={i.optionName} style={{ paddingLeft: '40px', margin: '10px' }}>
            <Space>
              <Button
                type={ans[i.optionName as optionType] ? 'primary' : 'default'}
                onClick={() => set(i.optionName as optionType)}
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
