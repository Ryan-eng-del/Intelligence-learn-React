import React from 'react'
import { Form, Rate, Button, message, Tag} from 'antd'
import { TextArea } from './TextArea';

type FooterType = {
  data: {
    explanation: string,
    rate: number,
    knowledge: Array<string>
  },
  setter:(obj:{
    explanation: string,
    rate: number,
    knowledge: Array<string>
  })=>void
}

export const Footer = (props: FooterType) => {
  const { data, setter } = props

  const RandomInt = () => Math.floor(Math.random() * 1e9)
  const handleRelate = () => {
    message.error("假装弹出了Modal")
    const newNode = [`知识${RandomInt()}`];
    setter({...data,knowledge:[...data.knowledge,...newNode]})
  }
  const closeTag = (item:any) => {
    setter({...data,knowledge:[...data.knowledge.filter(i=>i!=item)]})
  }
  return (
    <>
      <Form.Item label="解析">
        <TextArea
          style={{ height: '300px', overflowY: 'hidden' }}
          content={data.explanation}
          setContent={(c:string) => setter({...data,explanation:c})
          } />
      </Form.Item>
      <Form.Item label="难易度">
        <Rate value={data.rate} onChange={r => setter({...data,rate:r})}/>
      </Form.Item>
      <Form.Item label="知识点">
        <Button onClick={handleRelate} >
          关联知识点
        </Button>
      </Form.Item>
      {
        data.knowledge.map((item)=>(
          <Tag closable key={RandomInt()} onClose={()=>closeTag(item)}>{item}</Tag>
        ))
      }
      <Form.Item>
        <Button onClick={() => message.success("Success Save!")} size="large"
          htmlType="submit" style={{float:"right"}} type="primary">
          Save
        </Button>
      </Form.Item>

    </>
  )
}


