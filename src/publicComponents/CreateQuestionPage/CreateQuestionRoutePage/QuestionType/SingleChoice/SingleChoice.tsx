import React, { useState } from 'react'
import { Form, Button, Radio } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'
import { QuestionData, QuestionDataWithID, QuestionItem, QuestionType } from 'server/fetchExam/types'

export const SingleChoice: React.FC<{
  content: QuestionDataWithID
  callback?: (content:string, id:string) => void
}> = ({
  content
}) => {

  //序列化为题目数据
  const [question, setQuestion] = useState({
    id: content.questionId,
    content: content.questionDescription,
    TrueOption: content.rightAnswer || "",
    Options: content.questionOption.split("<>").map((i,x)=>({
      optionName: String.fromCharCode(x + 65), content: i
    })),
    footer: {
      explanation: content.questionDescription,
      rate: content.questionDifficulty,
      knowledge: content.pointIds,
    }
  })


  // 变化方法
  const handleChangeFooter = (obj: any) => {
    setQuestion({ ...question, footer: obj })
  }

  const handleChangeOption = (opt: string) => {
    setQuestion({ ...question, TrueOption: opt })
  }

  const handleEdit = (item: { content: string }, content: string) => {
    item.content = content
    setQuestion({ ...question })
  }

  return (
    <>
      <h1>单选题</h1>
      <div>{JSON.stringify(question)}</div>
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
        <Footer data={question} setter={handleChangeFooter}/>
      </Form>
    </>
  )
}
