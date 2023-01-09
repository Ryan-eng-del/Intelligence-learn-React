import { Button, Form, Input } from 'antd'
import { QuestionTitleArea } from 'publicComponents/QuestionTitleArea/QuestionTitleArea'
import React, { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { QuestionDataWithID } from 'server/fetchExam/types/index'
import { StateSetter } from 'types'
import { QuestionFooter } from '../QuestionFooter'
import './index.css'
export const FillBlank: React.FC<{
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}> = ({ setCurEditQuestion, dispatchQuestionType, question }) => {
  const [temp, setTemp] = useState(1)
  const handleEditTitle = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionDescription' } })
  }

  /** 添加空位 */
  const addBlank = () => {
    setTemp((pre) => (pre += 1))
  }

  /** 删除空位 */
  const delBlank = () => {
    setTemp((pre) => (pre -= 1))
  }

  /** 编辑正确答案 */
  const changeAnswer = (content: string, optionName: number, id: string) => {
    console.log(question, 'qs')
    dispatchQuestionType({
      type: 'editQuestion',
      payload: { content, id, target: 'questionOption', index: optionName }
    })
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
        <TransitionGroup>
          {Array.from({ length: temp }).map((_, index) => (
            <CSSTransition key={index} timeout={330} classNames="answer">
              <Form.Item key={index} label={`第${index + 1}空`}>
                <Input
                  placeholder={question.rightAnswer ? '答案' : '考试后评定'}
                  onChange={(e) => changeAnswer(e.target.value, index, question.questionId)}
                />
              </Form.Item>
            </CSSTransition>
          ))}
        </TransitionGroup>

        <div style={{ textAlign: 'center', marginBottom: '17px' }}>
          <Button onClick={addBlank} type="primary" style={{ marginRight: '15px' }}>
            添加空位
          </Button>
          <Button onClick={delBlank} type="primary" danger>
            删除空位
          </Button>
          <div style={{ color: 'rgb(152, 152, 152)', marginTop: '7px' }}>请确保空位与题干中的数量匹配</div>
        </div>

        <QuestionFooter
          question={question}
          setCurEditQuestion={setCurEditQuestion}
          dispatchQuestionType={dispatchQuestionType}
        />
      </Form>
    </>
  )
}
