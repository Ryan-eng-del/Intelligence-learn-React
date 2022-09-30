import React, { useState } from 'react'
import { Form, Button } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'
import { QuestionDataWithID } from 'server/fetchExam/types/index'
import { useMount } from 'hook/useMount'

export const MultipleChoice: React.FC<{
  content: QuestionDataWithID
}> = ({ content }) => {

  //序列化为题目数据
  const [question, setQuestion] = useState({
    id: content.questionId,
    content: content.questionDescription,
    TrueOption: content.rightAnswer || '',
    Options: content.questionOption.split('<>').map((i, x) => ({
      optionName: String.fromCharCode(x + 65),
      isTrue: true, content:i
    })),
    footer: {
      explanation: content.questionDescription,
      rate: content.questionDifficulty,
      knowledge: content.pointIds
    }
  })
  // 设置正确答案
  useMount(()=>{
    question.Options.map(i=>i.isTrue = content.rightAnswer.split(',').includes(i.optionName))
    setQuestion({...question})
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

  return (
    <>
      <h1>多选题</h1>
      {/* <div>{JSON.stringify(question)}</div> */}

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
        <Footer data={question} setter={handleChangeFooter} />
      </Form>
    </>
  )
}
