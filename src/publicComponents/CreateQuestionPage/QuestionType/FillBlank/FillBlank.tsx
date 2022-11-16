import React, { useState } from 'react'
import { Button, Form, Input, Switch } from 'antd'
import { QuestionDataWithID } from 'server/fetchExam/types/index'

export const FillBlank: React.FC<{
  content: QuestionDataWithID
}> = ({ content }) => {
  //序列化为题目数据
  const [question, setQuestion] = useState<any>()
  const handleEdit = (content: string) => {
    question.content = content
    setQuestion({ ...question })
  }
  const handleChangeFooter = (obj: any) => {
    setQuestion({ ...question, footer: obj })
  }
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
        {/*<QuestionTitleArea question={question} handleEdit={handleEdit} />*/}
        <Switch
          checkedChildren="客观"
          unCheckedChildren="主观"
          checked={question.isSubjective}
          onChange={(e) => setQuestion({ ...question, isSubjective: e })}
        />
        {/* <Form.Item label="自动打分"> */}
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
        {/*<QuestionFooter data={question} setter={handleChangeFooter} Serializer={Data2Network} PreviewPage={Preview} />*/}
      </Form>
    </>
  )
}
