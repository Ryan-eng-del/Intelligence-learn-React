import React, { useState } from 'react'
import { Form, Button, message, Radio } from 'antd'
import { TextArea } from '../TextArea'
import { Options } from '../Options'
import { Explain } from '../Explain'
import { DifficultDegree } from '../DifficultDegree'
import { useCreateQuestion, useShowCreateQuestion } from 'server/fetchExam'

export const SingleChoice: React.FC = () => {
  const [question, setQuestion] = useState({
    content: '',
    Options: [
      { optionName: 'A', isTrue: false, content: '' },
      { optionName: 'B', isTrue: false, content: '' },
      { optionName: 'C', isTrue: false, content: '' },
      { optionName: 'D', isTrue: false, content: '' }
    ],
    explain: '', //解析
    difficult_degree: 0 //难易度  0是容易，1是中等，2是困难
  })

  //添加试题
  const { mutate: createQuestion } = useCreateQuestion({
    course_id: '1',
    point_ids: ['我是知识点'],
    question_answer: '11',
    question_answer_description: question.explain,
    question_answer_num: 1,
    question_description: question.content,
    question_difficulty: question.difficult_degree,
    question_type: 0,
    right_answer: 'ss'
  })

  //处理题目
  const handleEditTitle = (html: string) => {
    if (html !== '<p><br></p>') {
      question.content = html
      setQuestion(question)
    } else {
      question.content = ''
      setQuestion(question)
    }
  }

  //处理选项
  const handleEditOption = (html: string, optionName: string) => {
    if (html !== '<p><br></p>') {
      question.Options.map((item) => {
        if (item.optionName === optionName) {
          item.content = html
        }
      })
      setQuestion(question)
    } else {
      question.Options.map((item) => {
        if (item.optionName === optionName) {
          item.content = ''
        }
      })
      setQuestion(question)
    }
  }

  //处理选择哪个选项
  const handleChangeRadio = (optionName: string) => {
    question.Options.map((item) => {
      if (item.optionName === optionName) {
        item.isTrue = true
      } else {
        item.isTrue = false
      }
    })
    setQuestion(question)
  }

  //处理解析
  const handleEditExplain = (html: string) => {
    if (html !== '<p><br></p>') {
      question.explain = html
      setQuestion(question)
    } else {
      question.explain = ''
      setQuestion(question)
    }
  }

  //处理难易度
  const handleChangeDegree = (value: number) => {
    //参数为难易度 0是容易，1是中等，2是困难
    question.difficult_degree = value
    setQuestion(question)
  }

  //处理保存Save
  const handleSave = () => {
    const optionNames: string[] = []
    let count = 0
    question.Options.map((item) => {
      if (item.content == '') {
        optionNames.push(item.optionName)
      }
      if (item.isTrue == true) {
        count++
      }
    })
    if (question.content == '') {
      //判断题目是否为空
      message.warning('请输入题目信息')
      console.log(1)
    } else if (count == 0) {
      //判断是否有选一个答案出来
      message.warning('请选择一个正确答案')
      console.log(3)
    } else if (question.explain == '') {
      //判断解析有无，没有就给一个默认值“暂无”
      console.log(4)
      question.explain = '暂无'
      setQuestion(question)
    } else if (optionNames.length) {
      //判断每个选项是否都有描述
      optionNames.map((item) => {
        message.warning('请输入选项' + item + '的信息')
      })
    } else {
      //保存成功的提示信息以及网络请求
      console.log(5)
      // message.success('保存成功')
      createQuestion()
    }
  }

  return (
    <>
      <h1 style={{ marginBottom: '30px' }}>单选题</h1>
      <Button
        onClick={() => {
          console.log(question)
        }}
      >
        控制台输出题目详情
      </Button>
      <Form>
        <Form.Item label="题目">
          <TextArea handleEdit={handleEditTitle}></TextArea>
        </Form.Item>

        <Radio.Group
          name="option"
          onChange={(e) => console.log('radio', e.target.value)}
        >
          {question.Options.map((item, index) => (
            <React.Fragment key={index + 1}>
              <Form.Item>
                <Radio.Button
                  value={index}
                  style={{
                    borderRadius: '50%',
                    height: '36px',
                    width: '36px',
                    position: 'relative'
                  }}
                  onClick={() => {
                    handleChangeRadio(item.optionName)
                  }}
                >
                  {
                    <div
                      style={{
                        fontSize: '17px',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-54%)'
                      }}
                    >
                      {item.optionName}
                    </div>
                  }
                </Radio.Button>
              </Form.Item>
              <Form.Item label={`选项${item.optionName}`}>
                <Options
                  handleEdit={handleEditOption}
                  optionName={item.optionName}
                />
              </Form.Item>
            </React.Fragment>
          ))}
        </Radio.Group>
        <Form.Item label="解析" style={{ marginTop: '42px' }}>
          <Explain handleEdit={handleEditExplain}></Explain>
        </Form.Item>

        <Form.Item label="难易度" style={{ marginTop: '20px' }}>
          <DifficultDegree handleEdit={handleChangeDegree}></DifficultDegree>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSave} htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
