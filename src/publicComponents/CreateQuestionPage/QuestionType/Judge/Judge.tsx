import { Form, Switch } from 'antd'
import { QuestionTitleArea } from 'publicComponents/QuestionTitleArea/QuestionTitleArea'
import React from 'react'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { QuestionDataWithID } from 'server/fetchExam/types/index'
import { StateSetter } from 'types'
import { QuestionFooter } from '../QuestionFooter'

export const Judge: React.FC<{
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}> = ({ question, dispatchQuestionType, setCurEditQuestion }) => {
  /* 处理单选题编辑题干 */
  const handleEditTitle = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionDescription' } })
  }

  const setQuestion = (e: boolean) => {
    // 这里不知道用什么事件更新
    // dispatchQuestionType({ type: 'editQuestion', payload: { target: 'rightAnswer' } })
    console.log(e)
  }
  return (
    <>
      <Form>
        <QuestionTitleArea
          question={question}
          handleEdit={(content: string) => handleEditTitle(content, question.questionId)}
          label={'题干'}
          questionOf={'questionDescription'}
        />
        <Form.Item label="正确答案" required>
          <Switch
            checkedChildren="对"
            unCheckedChildren="错"
            checked={question.rightAnswer == '1'}
            onChange={setQuestion}
          />
        </Form.Item>
        <QuestionFooter
          question={question}
          setCurEditQuestion={setCurEditQuestion}
          dispatchQuestionType={dispatchQuestionType}
        />
      </Form>
    </>
  )
}
