import { Checkbox } from 'antd'
import { QuestionTitleArea } from 'publicComponents/QuestionTitleArea/QuestionTitleArea'
import React, { useEffect, useRef, useState } from 'react'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { StateSetter } from 'types'
import { QuestionFooter } from '../QuestionFooter'
import { QuestionTextArea } from '../QuestionTextArea'
import { OptionWrapper } from '../SingleChoice/SingleChoice'

export const MultipleChoice: React.FC<{
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}> = ({ question, setCurEditQuestion, dispatchQuestionType }) => {
  /* 当前多选选择的选项 */
  const [curSelect, setCurSelects] = useState<string[]>([])

  const questionRef = useRef({ len: 0, rightAnswer: '' })

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

  /* 处理多选题编辑选项 */
  const handleEditRightMultipleOption = (optionName: string) => {
    const index = curSelect.find((i) => i === optionName)
    let newSelect: any
    if (!index) {
      newSelect = curSelect.concat(optionName)
    } else {
      newSelect = curSelect.filter((option) => option !== optionName)
    }

    questionRef.current.len = newSelect.length
    questionRef.current.rightAnswer = newSelect.join('')

    setCurSelects(newSelect)

    dispatchQuestionType({
      type: 'editQuestion',
      payload: { target: 'rightAnswer', content: questionRef.current.rightAnswer, id: question.questionId }
    })

    dispatchQuestionType({
      type: 'editQuestion',
      payload: { target: 'questionAnswerNum', content: questionRef.current.len, id: question.questionId }
    })
  }

  useEffect(() => {
    if (question.rightAnswer) {
      setCurSelects(question.rightAnswer.split(''))
    } else {
      setCurSelects([])
    }
  }, [question.questionId])

  return (
    <div>
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
            <Checkbox
              checked={curSelect[index] === item.optionName}
              onChange={() => handleEditRightMultipleOption(item.optionName)}
            >
              {item.optionName}
            </Checkbox>
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
        dispatchQuestionType={dispatchQuestionType}
      />
    </div>
  )
}
