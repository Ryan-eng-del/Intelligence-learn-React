import React, { useState } from 'react'
import { Form, Button,  Radio } from 'antd'
import { TextArea } from '../Component/TextArea'
import { Footer } from '../Component/Footer'

export const MultipleChoice: React.FC = () => {
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
        <h1>多选题</h1>
        <Button onClick={()=>{console.log(question)}}>控制台输出题目详情</Button>
        <Form>

          <Form.Item label="题目" required>
            <TextArea html={question.content} setHtml={(content:string)=>handleEdit(question,content)}></TextArea>
          </Form.Item>

          <Radio.Group buttonStyle="solid" name="option" onChange={(e)=>console.log(e.target.value)}>
            {
              question.Options.map((item,index)=>(
                <React.Fragment key={index+1}>
                  <Form.Item >
                    <Radio.Button value={index} style={{borderRadius: "10%", height:"30px", width:"30px"}}>{index}</Radio.Button>
                  </Form.Item>
                  <Form.Item label={`选项${index}`}>
                    <TextArea html={item.content} setHtml={(content:string)=>handleEdit(item,content)} />
                  </Form.Item>
                </React.Fragment>
              ))
            }
          </Radio.Group>
          {/* <Footer></Footer> */}
        </Form>
    </>
  )
}
