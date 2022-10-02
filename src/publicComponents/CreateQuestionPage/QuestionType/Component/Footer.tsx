import React from 'react'
import { Form, Button, Modal, Radio, message } from 'antd'
import { TextArea } from './TextArea'
import { useUpadateQuestion } from 'server/fetchExam'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'
import { Data2NetworkConverter, FooterType } from './types'

export const Footer: React.FC<{
  data: {
    footer: FooterType
    [key: string]: any
  }
  setter: (obj: FooterType) => void
  Serializer: Data2NetworkConverter<any> // 要求传入一个序列化器将题目数据转换为标准格式
  previewPage?: React.ReactElement
}> = ({ data, setter, Serializer }) => {
  //网络请求
  const { mutate } = useUpadateQuestion()

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
          onClick={() => mutate(Serializer(data))}
          size="large"
          htmlType="submit"
          style={{ float: 'right' }}
          type="primary"
        >
          Save
        </Button>
        <Button
          onClick={() => message.loading('打开预览界面')}
          size="large"
          style={{ float: 'right' }}
          type="primary"
        >
          预览
        </Button>
      </Form.Item>
    </>
  )
}
