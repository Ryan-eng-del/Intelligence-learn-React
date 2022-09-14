import React, { useState } from 'react'
import { Form, Button, Radio } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'
import { QuestionData } from 'server/fetchExam/types'

export const SingleChoice: React.FC = () => {
  const [question, setQuestion] = useState({
    //本页面的全部数据
    content: '',
    TrueOption: 'A',
    Options: [
      { optionName: 'A', content: '' },
      { optionName: 'B', content: '' },
      { optionName: 'C', content: '' },
      { optionName: 'D', content: '' }
    ],
    footer: {
      explanation: '',
      rate: 1,
      knowledge: ['离散数学', '图论'],
      score: 0
    }
  })

  //拼接选项:
  const [question_answer, setQuestion_answer] = useState('')

  //拼接答案:
  const [right_answer, setRight_answer] = useState('')

  const handleChangeFooter = (obj: any) => {
    setQuestion({ ...question, footer: obj })
  }

  const handleChangeOption = (opt: string) => {
    setQuestion({ ...question, TrueOption: opt })
    question.Options.map((item) => {
      if (item.optionName === opt) {
        setRight_answer(opt + item.content)
      }
    })
  }

  const handleEdit = (item: { content: string }, content: string) => {
    if (content !== '<p><br></p>') {
      item.content = content
    } else {
      item.content = ''
    }
    setQuestion({ ...question })
    setQuestion_answer('')
    let answer = ''
    let answerFlag = true
    question.Options.map((item) => {
      if (item.content === '') {
        answerFlag = false
      }
      answer += item.optionName + item.content + ';'
    })
    if (answerFlag) {
      setQuestion_answer(answer)
    }
  }
  const RandomInt = () => Math.floor(Math.random() * 1e9)

  const networkData: QuestionData = {
    courseId: RandomInt.toString(),
    pointIds: question.footer.knowledge,
    questionAnswerDescription: question.footer.explanation,
    questionAnswerNum: 1,
    questionDescription: question.content,
    questionDifficulty: question.footer.rate,
    questionType: 0,
    rightAnswer: question.TrueOption
  }
  console.log('network', networkData)

  return (
    <>
      <h1>单选题</h1>
      <Form>
        <Form.Item label="题目" required>
          <TextArea
            content={question.content}
            style={{ height: '250px', overflowY: 'hidden' }}
            setContent={(content: string) => handleEdit(question, content)}
          />
        </Form.Item>
        <Radio.Group
          buttonStyle="solid"
          name="option"
          value={question.TrueOption}
          onChange={(e) => handleChangeOption(e.target.value)}
        >
          {question.Options.map((item, index) => (
            <React.Fragment key={index + 1}>
              <Form.Item
                label={
                  <Radio.Button
                    value={item.optionName}
                    style={{
                      borderRadius: '50%',
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
                        {item.optionName}
                      </div>
                    }
                  </Radio.Button>
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
        </Radio.Group>
        <Footer
          networkData={networkData}
          data={question.footer}
          setter={handleChangeFooter}
        ></Footer>
      </Form>
    </>
  )
}
