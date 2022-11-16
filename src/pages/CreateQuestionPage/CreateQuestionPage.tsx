import React, { useState } from 'react'
import { CreateQuestionWrapper } from './CreateQuestionPageStyle'
import { CreateExamMenu } from 'components/CreateExamPage'
import { QuestionDataWithID, QuestionType } from 'server/fetchExam/types'
import { useCreateEmptyQuestion } from 'server/fetchExam'

export const CreateQuestionPage: React.FC = () => {
  const [curEdit, setCur] = useState<QuestionDataWithID>()
  const { Provider } = React.createContext(curEdit)

  const { mutate } = useCreateEmptyQuestion()
  const RandomInt = () => Math.floor(Math.random() * 1e9)

  const AddQuestion = (type: QuestionType) => {
    mutate(type)
    setCur({
      questionId: RandomInt().toString(),
      questionDescription: '',
      courseId: '',
      pointIds: [],
      questionOption: 'dsadas<>fr<>ads<>dsads',
      questionAnswerExplain: '',
      questionAnswerNum: 1,
      questionDifficulty: 1,
      questionType: type,
      rightAnswer: 'A'
    })
  }
  return (
    <>
      <CreateQuestionWrapper>
        <CreateExamMenu addQuestionType={AddQuestion} />
        <Provider value={curEdit}></Provider>
      </CreateQuestionWrapper>
    </>
  )
}
