import React, { useState } from 'react'
import { Form } from 'antd'
import { QuestionDataWithID } from 'server/fetchExam/types/index'

export const ShortAnswer: React.FC<{
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
        {/*<QuestionFooter data={question} setter={handleChangeFooter} Serializer={Data2Network} PreviewPage={Preview} />*/}
      </Form>
    </>
  )
}
