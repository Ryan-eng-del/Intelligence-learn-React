import React from 'react'
import { Form, Button, message, Tag, Radio, InputNumber } from 'antd'
import { TextArea } from '../Component/TextArea'
import { useCreateQuestion, useUpadateQuestion } from 'server/fetchExam'
import { QuestionData, QuestionDataWithID, QuestionType } from 'server/fetchExam/types/index'
import { useNavigate } from 'react-router-dom'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'


export const Footer: React.FC<{
  data: {
    id: string,
    //本页面的全部数据
    content: string,
    TrueOption: string,
    Options: any[],
    footer: {
      explanation: string,
      rate: CSSNumberish,
      knowledge: string[],
    }
  }
  setter: (obj: {
    explanation: string
    rate: number
    knowledge: Array<string>
  }) => void

}> = ({ data, setter }) => {

  const networkData: QuestionDataWithID = {
    questionId: data.id,
    courseId: data.id,
    pointIds: data.footer.knowledge,
    questionOption: JSON.stringify(data.Options),
    questionAnswerExplain: data.footer.explanation,
    questionAnswerNum: 1,
    questionDescription: data.content,
    questionDifficulty: data.footer.rate,
    questionType: QuestionType.single,
    rightAnswer: data.TrueOption
  }
  //网络请求
  const { mutate } = useUpadateQuestion()

  //保存按钮
  const SuccessSave = () => {
    if (data.footer.explanation === '') {
      setter({ ...data.footer, explanation: '暂无' })
    }
    mutate({...networkData})
  }

  const handleSave = () => {
    console.error("Footer序列化网络实体没有这么简单，需要类型判断");
    if (networkData.questionDescription === '') {
      message.error('请输入题目信息')
    } else if (networkData.questionOption.split("<>").includes('')) {
      if (networkData.questionOption === '') {
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
          content={data.footer.explanation}
          setContent={(c: string) => {
            if (c !== '<p><br></p>') {
              setter({ ...data.footer, explanation: c })
            } else {
              setter({ ...data.footer, explanation: '' })
            }
          }}
        />
      </Form.Item>
      <Form.Item label="难易度">
        <Radio.Group
          name="radiogroup"
          defaultValue={0}
          style={{ marginLeft: '15px' }}
          onChange={(e) => setter({ ...data.footer, rate: e.target.value })}
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
        <KnowledgeSeletor
          related={data.footer.knowledge}
          callback={(newList) => setter({ ...data.footer, knowledge: newList})}
        />
      </Form.Item>
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
