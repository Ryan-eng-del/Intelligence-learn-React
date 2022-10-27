import React, { useState } from 'react'
import { Form, Button, Modal, Radio } from 'antd'
import { TextArea } from './TextArea'
import { useUpadateQuestion } from 'server/fetchExam'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'
import { Data2NetworkConverter, FooterType } from './types'
import { QuestionDataWithID } from 'server/fetchExam/types'

export const Footer: React.FC<{
  data: {
    footer: FooterType
    [key: string]: any
  }
  setter: (obj: FooterType) => void

  // 要求传入一个序列化器将题目数据转换为标准格式
  Serializer: Data2NetworkConverter<any>
  // 预览界面
  PreviewPage?: React.FC<{
    content: QuestionDataWithID
  }>
}> = ({ data, setter, Serializer, PreviewPage }) => {
  //网络请求
  const { mutate } = useUpadateQuestion()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
          onClick={() => mutate(Serializer(data))}
          size="large"
          htmlType="submit"
          style={{ float: 'right' }}
          type="primary"
        >
          Save
        </Button>
        <Button
          onClick={showModal}
          size="large"
          style={{ float: 'right' }}
          type="primary"
        >
          预览
        </Button>
      </Form.Item>
      <Modal
        title="预览"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        {PreviewPage ? (
          <PreviewPage content={Serializer(data)} />
        ) : (
          <h1>传入一个预览界面</h1>
        )}
      </Modal>
    </>
  )
}
