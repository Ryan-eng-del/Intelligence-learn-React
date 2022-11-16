import React, { useState } from 'react'
import { Form, Switch } from 'antd'
import { QuestionDataWithID } from 'server/fetchExam/types/index'

export const Judge: React.FC<{
  content: QuestionDataWithID
}> = ({ content }) => {
  //序列化为题目数据
  const [question, setQuestion] = useState<any>()
  const handleEdit = (content: string) => {
    question.content = content
    setQuestion({ ...question })
  }
  const handleChangeFooter = (obj: any) => {
    setQuestion({ ...question, footer: obj })
  }

  return (
    <>
      <Form>
        {/*<QuestionTitleArea question={question} handleEdit={handleEdit} />*/}

        <Form.Item label="正确答案" required>
          <Switch
            checkedChildren="对"
            unCheckedChildren="错"
            checked={question.isTrue}
            onChange={(e) => setQuestion({ ...question, isTrue: e })}
          />
        </Form.Item>
        {/*<QuestionFooter data={question} setter={handleChangeFooter} Serializer={Data2Network} PreviewPage={Preview} />*/}
      </Form>
    </>
  )
}
