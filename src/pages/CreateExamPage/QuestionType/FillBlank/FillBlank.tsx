import React, { useState } from 'react'
import { Form, Switch, Input, Button } from 'antd'
import { Footer } from '../Component/Footer'
import { TextArea } from '../Component/TextArea'
// import { RandomInt } from 'publicComponents/ClassInfoPage/ChapterList/config/util'
import { QuestionData } from 'server/fetchExam/type/index'

export const FillBlank: React.FC = () => {
  const [question, setQuestion] = useState({
    //本页面的全部数据
    content: '',
    objective: true,
    blank: [{ id: 1, content: '' }],
    footer: {
      explanation: '',
      rate: 1,
      knowledge: ['离散数学', '图论'],
      score: 0
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
    question.blank.push({ id: Math.random(), content: '' })
    setQuestion({ ...question })
  }

  const delBlank = () => {
    question.blank.length -= 1
    setQuestion({ ...question })
  }

  const changeAnswer =
    (item: { id: number; content: string }) => (value: any) => {
      item.content = value
      setQuestion({ ...question })
    }

  const RandomInt = () => Math.floor(Math.random() * 1e9)

  const networkData: QuestionData = {
    course_id: RandomInt.toString(), //要改
    point_ids: question.footer.knowledge,
    question_answer: '11',
    question_answer_description: question.footer.explanation,
    question_answer_num: 1,
    question_description: question.content,
    question_difficulty: question.footer.rate,
    question_type: 0,
    right_answer: ''
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
          checked={question.objective}
          onChange={(e) => setQuestion({ ...question, objective: e })}
        />
        {/* <Form.Item label="自动打分"> */}
        {question.blank.map((item, index) => (
          <Form.Item key={item.id} label={`第${index + 1}空`}>
            <Input
              placeholder={question.objective ? '答案' : '考试后评定'}
              disabled={!question.objective}
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
        <Footer
          networkData={networkData}
          data={question.footer}
          setter={handleChangeFooter}
        ></Footer>
      </Form>
    </>
  )
}
