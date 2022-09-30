import React, { useState } from 'react'
import { Form, Switch, Input, Button } from 'antd'
import { Footer } from '../Component/Footer'
import { TextArea } from '../Component/TextArea'
// import { RandomInt } from 'publicComponents/ClassInfoPage/ChapterList/config/util'
import { QuestionData, QuestionDataWithID, QuestionItem } from 'server/fetchExam/types/index'

export const FillBlank: React.FC<{
  content: QuestionDataWithID
}> = ({content}) => {

  //序列化为题目数据
  const [question, setQuestion] = useState({
    id: content.questionId,
    content: content.questionDescription,
    TrueOption: content.rightAnswer ,//设置主客观性
    Options: content.questionOption.split('<>').map((i, x) => ({
      id: x,
      content: i
    })),
    footer: {
      explanation: content.questionDescription,
      rate: content.questionDifficulty,
      knowledge: content.pointIds
    }
  })
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

  const changeAnswer =
    (item: { id: number; content: string }) => (value: any) => {
      item.content = value
      setQuestion({ ...question })
    }

  return (
    <>
      <h1>填空题</h1>
      <Form>
        <Form.Item label="题目" required>
          <TextArea
            content={question.content}
            style={{ height: '300px', overflowY: 'hidden' }}
            setContent={(content: string) => handleEdit(content)}
          />
        </Form.Item>
        <Switch
          checkedChildren="客观"
          unCheckedChildren="主观"
          checked={question.TrueOption == 'true'}
          onChange={(e) => setQuestion({ ...question, TrueOption: e.toString() })}
        />
        {/* <Form.Item label="自动打分"> */}
        {question.Options.map((item, index) => (
          <Form.Item key={item.id} label={`第${index + 1}空`}>
            <Input
              placeholder={question.TrueOption == 'true' ? '答案' : '考试后评定'}
              disabled={question.TrueOption != 'true'}
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
        <Footer data={question} setter={handleChangeFooter}/>
      </Form>
    </>
  )
}
