import React, { useEffect, useState } from 'react'
import { Checkbox, Radio } from 'antd'
import { QuestionTextArea } from '../QuestionTextArea'
import { QuestionDataWithID } from 'server/fetchExam/types'
import styled from 'styled-components'
import { QuestionTitleArea } from '../../../QuestionTitleArea/QuestionTitleArea'
import { StateSetter } from 'types'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { QuestionFooter } from '../QuestionFooter'

interface SingleChoiceProps {
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
  config: 'single' | 'multiple'
}

export const SingleChoice = (props: SingleChoiceProps) => {
  const { question, config, setCurEditQuestion, dispatchQuestionType } = props
  /* 当选选中的选项 */
  const [curSelect, setCurSelect] = useState('')

  /* 当前多选选择的选项 */
  const [curSelects, setCurSelects] = useState<string[]>([])

  /* 处理单选题编辑题干 */
  const handleEditTitle = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionDescription' } })
  }

  /* 处理编辑题目选项 */
  const handleEditOption = (content: string, optionName: string, id: string) => {
    dispatchQuestionType({
      type: 'editQuestion',
      payload: { content, id, target: 'questionOption', index: optionName.charCodeAt(0) - 65 }
    })
  }

  /* 处理单选题编辑选项 */
  const handleEditRightOption = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'rightAnswer' } })
    dispatchQuestionType({ type: 'editQuestion', payload: { content: 1, id, target: 'questionAnswerNum' } })
    setCurSelect(content)
    setCurEditQuestion(question)
  }

  /* 处理多选题编辑选项 */
  const handleEditRightMultipleOption = (optionName: string) => {
    setCurSelects((pre) => {
      const index = pre.indexOf(optionName)
      if (index < 0) {
        pre = pre.concat(optionName)
      } else {
        pre = pre.filter((option) => option !== optionName)
      }
      question.rightAnswer = pre.slice(1).join(',')
      question.questionAnswerNum = pre.length
      return pre
    })
    setCurEditQuestion(question)
  }

  useEffect(() => {
    setCurSelect(question.rightAnswer)
    setCurSelects(question.rightAnswer.split(','))
  }, [question.questionId])

  return (
    <>
      <QuestionTitleArea
        question={question}
        handleEdit={(content: string) => handleEditTitle(content, question.questionId)}
        label={'题干'}
        questionOf={'questionDescription'}
      />
      {question.questionOption
        .split('<>')
        .map((item, index) => ({
          optionName: String.fromCharCode(index + 65),
          content: item
        }))
        .map((item, index) => (
          <OptionWrapper key={index}>
            {config === 'single' ? (
              <LabelArea>
                <Radio.Group
                  onChange={(e) => handleEditRightOption(e.target.value, question.questionId)}
                  value={curSelect}
                >
                  <Radio value={item.optionName}>{item.optionName}</Radio>
                </Radio.Group>
              </LabelArea>
            ) : (
              <Checkbox.Group onChange={() => handleEditRightMultipleOption(item.optionName)} value={curSelects}>
                <Checkbox value={item.optionName}>{item.optionName}</Checkbox>
              </Checkbox.Group>
            )}
            <QuestionTextArea
              question={question}
              option={item}
              setContent={(content: string) => handleEditOption(content, item.optionName, question.questionId)}
            />
          </OptionWrapper>
        ))}
      <QuestionFooter
        question={question}
        setCurEditQuestion={setCurEditQuestion}
        dispatchQuestionType={props.dispatchQuestionType}
      />
    </>
  )
}
export const LabelArea = styled.span`
  width: 52px;
  text-align: center;
`
export const QuestionContentWrapper = styled.div`
  display: flex;
  margin-bottom: 37px;
`
export const OptionWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`
