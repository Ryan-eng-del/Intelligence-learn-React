import { Radio, Checkbox } from 'antd'
import { config } from 'process'
import { QuestionTitleArea } from 'publicComponents/QuestionTitleArea/QuestionTitleArea'
import React, { useEffect, useState } from 'react'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { StateSetter } from 'types'
import { QuestionFooter } from '../QuestionFooter'
import { QuestionTextArea } from '../QuestionTextArea'
import { OptionWrapper, LabelArea } from '../SingleChoice/SingleChoice'

export const MultipleChoice: React.FC<{
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}> = ({ question, setCurEditQuestion, dispatchQuestionType }) => {
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
    setCurSelects(question.rightAnswer.split(','))
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
            <Checkbox.Group onChange={() => handleEditRightMultipleOption(item.optionName)} value={curSelects}>
              <Checkbox value={item.optionName}>{item.optionName}</Checkbox>
            </Checkbox.Group>
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
