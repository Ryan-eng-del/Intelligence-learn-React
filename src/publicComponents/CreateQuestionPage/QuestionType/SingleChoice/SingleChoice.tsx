import React, { useState } from 'react'
import { Form, Radio } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { Data2Network, Network2Data } from './config'
import { Preview } from './Preview'

const Single: React.FC<{
  content: QuestionDataWithID
  callback?: (newData: QuestionDataWithID) => void
}> = ({ content, callback }) => {
  //正序列化为题目数据
  const [question, setQuestion] = useState(Network2Data(content))

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
    // 测试数据反向流动
    callback ? callback(Data2Network(question)) : 0
  }

  return (
    <>
      <h1>单选题</h1>
      {/* <div>{JSON.stringify(question)}</div> */}
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
          data={question}
          setter={handleChangeFooter}
          Serializer={Data2Network}
          PreviewPage={Preview}
        />
      </Form>
    </>
  )
}
export const SingleChoice = React.memo(Single)
