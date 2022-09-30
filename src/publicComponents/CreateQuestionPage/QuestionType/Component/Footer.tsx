import React from 'react'
import { Form, Button, message, Radio } from 'antd'
import { TextArea } from './TextArea'
import { useCreateQuestion, useUpadateQuestion } from 'server/fetchExam'
import { QuestionDataWithID, QuestionType } from 'server/fetchExam/types/index'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'
import { useNavigate } from 'react-router-dom'
import { FooterType } from './types'

export const Footer: React.FC<{
  data: {
    footer: FooterType,
    [key: string]: any
  }
  setter: (obj: FooterType) => void
  Serializer?:(data:any) => QuestionDataWithID // 要求传入一个序列化器将题目数据转换为标准格式
}> = ({ data, setter, Serializer }) => {
  const navigator = useNavigate()
  const { id, Options, content, TrueOption, rightAnswerNum, footer } = data
  const { explanation, rate, knowledge } = footer

  //处理Options
  // PCR: 这个页面的数据处理应该都交给传入的转换器处理
  const handleOptions = () => {
    const optionsArr: string[] = []
    Options.map((item: { content: string }) => {
      optionsArr.push(item.content)
    })
    const options = optionsArr.join('<>')
    return options
  }

  //编辑题目
  // PCR: 这个页面的数据处理应该都交给传入的转换器处理
  // const networkData: QuestionDataWithID = {
  //   questionId: id,
  //   courseId: id,
  //   pointIds: knowledge,
  //   questionOption: Options ? handleOptions() : '没有',
  //   questionAnswerExplain: explanation,
  //   questionAnswerNum: rightAnswerNum ? rightAnswerNum : 1,
  //   questionDescription: content,
  //   questionDifficulty: rate,
  //   questionType: QuestionType.single,
  //   rightAnswer: TrueOption ? TrueOption : ''
  // }

  //网络请求
  const { mutate } = useUpadateQuestion()



  const handleSave = () => {
    // if (networkData.questionDescription === '') {
    //   message.error('请输入题目信息')
    // } else if (networkData.questionOption.split('<>').includes('')) {
    //   if (networkData.questionOption === '') {
    //     message.error('请输入选项信息')
    //   }
    // } else if (networkData.questionAnswerExplain === '') {
    //   setter({ ...data.footer, explanation: '暂无' })
    //   networkData.questionAnswerExplain = '暂无'
    // } else {

    //   mutate({ ...networkData })
    //   //跳转到预览界面:有两种预览界面
    //   navigator(`/preview/${id}`) //题库的
      console.log("校验数据格式");
      mutate(Serializer!(data))
    // }
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
          callback={(newList) => setter({ ...data.footer, knowledge: newList })}
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
