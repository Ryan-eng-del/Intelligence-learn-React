import React from 'react'
import { Form, Button, message, Tag, Radio, InputNumber } from 'antd'
import { TextArea } from '../Component/TextArea'
import { useCreateQuestion } from 'server/fetchExam'
import { QuestionData } from 'server/fetchExam/types/index'
import { useNavigate } from 'react-router-dom'

type FooterType = {
  networkData: QuestionData
  data: {
    explanation: string
    rate: number
    knowledge: Array<string>
    score: number
  }
  setter: (obj: {
    explanation: string
    rate: number
    knowledge: Array<string>
    score: number
  }) => void
}

export const Footer: React.FC<FooterType> = (props: FooterType) => {
  const { data, setter, networkData } = props
  const navigate = useNavigate()
  //网络请求
  const { mutate: createQuestion } = useCreateQuestion({
    ...networkData
  })
  const RandomInt = () => Math.floor(Math.random() * 1e9)
  const handleRelate = () => {
    message.error('假装弹出了Modal')
    const newNode = [`知识${RandomInt()}`]
    setter({ ...data, knowledge: [...data.knowledge, ...newNode] })
  }
  const closeTag = (item: any) => {
    setter({ ...data, knowledge: [...data.knowledge.filter((i) => i != item)] })
  }

  //保存按钮
  const SuccessSave = () => {
    if (data.explanation === '') {
      setter({ ...data, explanation: '暂无' })
    }
    //网络请求
    createQuestion()
    //跳转到预览界面
    // navigate('preview')
    //添加到题库中
  }

  const handleSave = () => {
    if (networkData.question_description === '') {
      message.error('请输入题目信息')
    } else if ('question_answer' in networkData) {
      if (networkData.question_answer === '') {
        message.error('请输入选项信息')
      } else {
        SuccessSave()
      }
    } else {
      SuccessSave()
    }
  }
  return (
    <>
      <hr />
      <Form.Item label="解析" style={{ marginTop: '30px' }}>
        <TextArea
          style={{ height: '250px', overflowY: 'hidden' }}
          content={data.explanation}
          setContent={(c: string) => {
            if (c !== '<p><br></p>') {
              setter({ ...data, explanation: c })
            } else {
              setter({ ...data, explanation: '' })
            }
          }}
        />
      </Form.Item>
      <Form.Item label="本题分数">
        <InputNumber
          min={0}
          max={50}
          defaultValue={0}
          style={{ width: '55px', height: '30px' }}
          onChange={(value: number) => {
            setter({ ...data, score: value })
          }}
        />
      </Form.Item>
      <Form.Item label="难易度">
        <Radio.Group
          name="radiogroup"
          defaultValue={0}
          style={{ marginLeft: '15px' }}
          onChange={(e) => setter({ ...data, rate: e.target.value })}
        >
          <Radio value={0} style={{ fontSize: '13px' }}>
            易
          </Radio>
          <Radio value={1} style={{ fontSize: '13px' }}>
            中
          </Radio>
          <Radio value={2} style={{ fontSize: '13px' }}>
            难
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="知识点">
        <Button onClick={handleRelate}>关联知识点</Button>
      </Form.Item>
      {data.knowledge.map((item) => (
        <Tag closable key={RandomInt()} onClose={() => closeTag(item)}>
          {item}
        </Tag>
      ))}
      <Form.Item>
        <Button
          onClick={handleSave}
          size="large"
          htmlType="submit"
          style={{ float: 'right' }}
          type="primary"
        >
          Save
        </Button>
      </Form.Item>
    </>
  )
}
