import React, { useEffect, useState } from 'react'
import { Checkbox, Radio } from 'antd'
import { QuestionTextArea } from '../QuestionTextArea'
import { QuestionDataWithID } from 'server/fetchExam/types'
import styled from 'styled-components'
import { QuestionTitleArea } from '../../../QuestionTitleArea/QuestionTitleArea'
import { StateSetter } from '../../../../types'
import { IQuestionType, IQuestionTypeAction } from '../../../../reducer/CreateExamPaper/type/type'
import { QuestionFooter } from '../QuestionFooter'

interface SingleChoiceProps {
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | null>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
  config: 'single' | 'multiple'
}

export const SingleChoice = (props: SingleChoiceProps) => {
  const { question, config, setCurEditQuestion } = props
  /*当选选中的选项*/
  const [curSelect, setCurSelect] = useState('')
  /*当前多选选择的选项*/
  const [curSelects, setCurSelects] = useState<string[]>([])
  const getFromOptionObj = (option: string, content: string) => {
    const splitArr = question.questionOption.split('<>')
    const index = option.charCodeAt(0) - 65
    splitArr[index] = content
    return splitArr.join('<>')
  }
  /*处理单选题编辑题干*/
  const handleEditTitle = (content: string) => {
    question.questionDescription = content
    setCurEditQuestion(question)
  }

  /*处理编辑题目选项*/
  const handleEditOption = (content: string, optionName: string) => {
    question.questionOption = getFromOptionObj(optionName, content)
    setCurEditQuestion(question)
  }

  /*处理单选题编辑选项*/
  const handleEditRightOption = (value: string) => {
    question.rightAnswer = value
    question.questionAnswerNum = 1
    setCurSelect(value)
    setCurEditQuestion(question)
  }

  /*处理多选题编辑选项*/
  const handleEditRightMultipleOption = (optionName: string) => {
    setCurSelects((pre) => {
      const index = pre.indexOf(optionName)
      if (index < 0) {
        pre = pre.concat(optionName)
      } else {
        pre = pre.filter((option) => option !== optionName)
      }
      question.rightAnswer = pre.slice(1).join(',')
      console.log(question.rightAnswer)
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
        handleEdit={(content: string) => handleEditTitle(content)}
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
                <Radio.Group onChange={(e) => handleEditRightOption(e.target.value)} value={curSelect}>
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
              setContent={(content: string) => handleEditOption(content, item.optionName)}
            />
          </OptionWrapper>
        ))}
      <QuestionFooter question={question} setCurEditQuestion={setCurEditQuestion} />
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
