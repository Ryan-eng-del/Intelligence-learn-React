import { Button, Form, Input } from 'antd'
import { join } from 'lodash'
import { QuestionTitleArea } from 'publicComponents/QuestionTitleArea/QuestionTitleArea'
import React, { useState } from 'react'
import { IQuestionType, IQuestionTypeAction, IQuestionTypeConstructor } from 'reducer/CreateExamPaper/type/type'
import { QuestionDataWithID, QuestionType } from 'server/fetchExam/types/index'
import { StateSetter } from 'types'
import { QuestionFooter } from '../QuestionFooter'

export const FillBlank: React.FC<{
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}> = ({ setCurEditQuestion, dispatchQuestionType }) => {
  /** 使用rightAnswer存储主客观 */
  const [question, setQuestion] = useState<IQuestionType>(IQuestionTypeConstructor(QuestionType.fillBlank))

  const handleEditTitle = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionDescription' } })
  }
  /** 添加空位 */
  const addBlank = () => {
    const opts = question.questionOption.split('<>')
    opts.push(' ')
    setQuestion({ ...question, questionOption: join(opts, '<>') })
  }

  /** 删除空位 */
  const delBlank = () => {
    const opts = question.questionOption.split('<>')
    if (opts.length > 0) opts.slice(0, -1)
    setQuestion({ ...question })
  }

  /** 编辑正确答案 */
  const changeAnswer = (index: number) => (value: string) => {
    const opts = question.questionOption.split('<>')
    opts[index] = value
    setQuestion({ ...question, questionOption: join(opts, '<>') })
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
        {question.questionOption.split('<>').map((item, index) => (
          <Form.Item key={index} label={`第${index + 1}空`}>
            <Input
              placeholder={question.rightAnswer ? '答案' : '考试后评定'}
              disabled={question.rightAnswer == '1'}
              value={item}
              onChange={(value) => changeAnswer(index)(value.target.value)}
            />
          </Form.Item>
        ))}
        <Button onClick={addBlank} type="primary">
          添加更多空位
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={delBlank} type="primary" danger>
          删除空位
        </Button>
        &nbsp;&nbsp;&nbsp; *请确保空位与题干中的数量匹配
        <QuestionFooter
          question={question}
          setCurEditQuestion={setCurEditQuestion}
          dispatchQuestionType={dispatchQuestionType}
        />
      </Form>
    </>
  )
}
