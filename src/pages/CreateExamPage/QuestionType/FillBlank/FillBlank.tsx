import React, {useState} from 'react'
import { Form, Switch, Input } from 'antd'
import { Footer } from '../Component/Footer'
import { TextArea } from '../Component/TextArea'

export const FillBlank: React.FC = () => {

  const [objective,setObjective] = useState(false)

  return (
    <>
      <h1>填空题</h1>
      <Form>
        <Form.Item label="题目" required>
          <TextArea></TextArea>
        </Form.Item>
        <Switch checkedChildren="客观" unCheckedChildren="主观" onChange={(e)=>setObjective(e)}/>
        <Form.Item label="自动打分">
        <Input placeholder="答案" disabled={objective} />
        </Form.Item>
        <Footer></Footer>
      </Form>
    </>
  )
}
