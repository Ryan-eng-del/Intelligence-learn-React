import React, { useState } from 'react'
import { Form, Button, message,  Radio } from 'antd'
import { TextArea } from '../TextArea'
import { Options } from '../Options'


export const SingleChoice: React.FC = () => {
  const [question,setQuestion] = useState({
    content: '',
    Options: [
      { isTrue:true, content: "" },
      { isTrue:false, content: "" },
      { isTrue:false, content: "" },
      { isTrue:false, content: "" }
    ]
  })

  const handleEdit = (item: { content: string }, content: string) => {
    item.content = content;
    setQuestion(question);
  }

  return (
    <>
        <h1>SingleChoice</h1>
        <Button onClick={()=>{console.log(question)}}>控制台输出题目详情</Button>
        <Form>

          <Form.Item label="题目">
            <TextArea html={question.content} setHtml={(content:string)=>handleEdit(question,content)}></TextArea>
          </Form.Item>

          <Radio.Group name="option" onChange={(e)=>console.log(e.target.value)}>
            {
              question.Options.map((item,index)=>(
                <React.Fragment key={index+1}>
                  <Form.Item >
                    <Radio.Button value={index} style={{borderRadius: "50%", height:"30px", width:"30px"}}>{index}</Radio.Button>
                  </Form.Item>
                  <Form.Item label={`选项${index}`}>
                    <Options html={item.content} setHtml={(content:string)=>handleEdit(item,content)} />
                  </Form.Item>
                </React.Fragment>
              ))
            }
          </Radio.Group>
          <Form.Item>
            <Button onClick={() => message.success("Success Save!")} htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
    </>
  )
}


