import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { QuestionDataWithID } from 'server/fetchExam/types/index'

export const FillBlank: React.FC<{
  content: QuestionDataWithID
}> = () => {
  // 序列化为题目数据
  const [question, setQuestion] = useState<any>()

  const addBlank = () => {
    question.Options.push({ id: Math.random(), content: '' })
    setQuestion({ ...question })
  }

  const delBlank = () => {
    question.Options.length -= 1
    setQuestion({ ...question })
  }

  const changeAnswer = (item: { id: number; content: string }) => (value: any) => {
    item.content = value
    setQuestion({ ...question })
  }

  return (
    <>
      <Form>
        {question.Options.map((item: any, index: any) => (
          <Form.Item key={item.id} label={`第${index + 1}空`}>
            <Input
              placeholder={question.isSubjective ? '答案' : '考试后评定'}
              disabled={question.isSubjective}
              value={item.content}
              onChange={(value) => changeAnswer(item)(value.target.value)}
            />
          </Form.Item>
        ))}
        {/* </Form.Item> */}
        <Button onClick={addBlank} type="primary">
          添加更多空位
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={delBlank} type="primary" danger>
          删除空位
        </Button>
        &nbsp;&nbsp;&nbsp; *请确保空位与题干中的数量匹配
      </Form>
    </>
  )
}
