import { Button, Space } from 'antd'
import React from 'react'
import { QuestionDataWithID } from 'server/fetchExam/types'

export const MultipleChoiceP: React.FC<{
  content: QuestionDataWithID
}> = ({ content }) => {
  const question = {
    id: content.questionId,
    content: content.questionDescription,
    TrueOption: content.rightAnswer || '',
    Options: content.questionOption.split('<>').map((i, x) => ({
      optionName: String.fromCharCode(x + 65),
      content: i
    })),
    footer: {
      explanation: content.questionDescription,
      rate: content.questionDifficulty,
      knowledge: content.pointIds
    }
  }
  const str2DOM = (str:string) => <div dangerouslySetInnerHTML={{__html:str}} />

  return (
    <>
      <h2>题目(未完成)</h2>
      {str2DOM(question.content)}
      <h2>选项</h2>
      {question.Options.map((i) => (
        <div key={i.optionName}>
          <Space>
            <Button
              type={i.optionName == question.TrueOption ? 'primary' : 'default'}
            >
              {i.optionName}
            </Button>
            {str2DOM(i.content)}
          </Space>
        </div>
      ))}
      <h2>解析</h2>
      {str2DOM(question.footer.explanation)}

    </>
  )
}
