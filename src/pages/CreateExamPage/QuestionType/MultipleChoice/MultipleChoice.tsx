import React, { useState } from 'react'
import { Form, Button } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'
import { QuestionData } from 'server/fetchExam/type/index'

export const MultipleChoice: React.FC = () => {
  const [question, setQuestion] = useState({
    content: '',
    Options: [
      { isTrue: true, content: '' },
      { isTrue: false, content: '' },
      { isTrue: false, content: '' },
      { isTrue: false, content: '' }
    ],
    footer: {
      explanation: '',
      rate: 1,
      knowledge: ['离散数学', '图论'],
      score: 0
    }
  })

  const handleChangeFooter = (obj: any) => {
    setQuestion({ ...question, footer: obj })
  }
  const handleChangeOption = (item: { isTrue: boolean }) => {
    item.isTrue = !item.isTrue
    setQuestion({ ...question })
  }

  const handleEdit = (item: { content: string }, content: string) => {
    item.content = content
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
      <h1>多选题</h1>
      <Button
        onClick={() => {
          console.log(question)
        }}
      >
        控制台输出题目详情
      </Button>
      <Form>
        <Form.Item label="题目" required>
          <TextArea
            content={question.content}
            style={{ height: '300px', overflowY: 'hidden' }}
            setContent={(content: string) => handleEdit(question, content)}
          />
        </Form.Item>
        {question.Options.map((item, index) => (
          <React.Fragment key={index + 1}>
            <Form.Item
              label={
                <Button
                  type={item.isTrue ? 'primary' : 'default'}
                  onClick={() => handleChangeOption(item)}
                  style={{
                    borderRadius: '10%',
                    height: '30px',
                    width: '30px',
                    position: 'relative'
                  }}
                >
                  {
                    <div
                      style={{
                        fontSize: '14px',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-40%,-54%)'
                      }}
                    >
                      {String.fromCharCode(index + 65)}
                    </div>
                  }
                </Button>
              }
            >
              <TextArea
                style={{
                  height: '50px',
                  overflowY: 'hidden',
                  minWidth: '1100px'
                }}
                content={item.content}
                setContent={(content: string) => handleEdit(item, content)}
              />
            </Form.Item>
          </React.Fragment>
        ))}
        <Footer
          networkData={networkData}
          data={question.footer}
          setter={handleChangeFooter}
        ></Footer>
      </Form>
    </>
  )
}
