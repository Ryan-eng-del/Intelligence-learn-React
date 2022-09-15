import React, { useState } from 'react'
import { CreateQuestionWrapper } from './CreateQuestionPageStyle'
import { CreateExamMenu, CreateExamRoutePage } from 'components/CreateExamPage'
import { QuestionData, QuestionDataWithID, QuestionType } from 'server/fetchExam/types'
import { useCreateEmptyQuestion, useShowQuestionDetails } from 'server/fetchExam'

export const CreateQuestionPage: React.FC = () => {

  const [curEdit,setCur] = useState<QuestionDataWithID>()
  const { Provider, Consumer } = React.createContext(curEdit)

  const { mutate, data } = useCreateEmptyQuestion()
  const RandomInt = () => Math.floor(Math.random() * 1e9)

  const AddQuestion = (type: QuestionType) => {
    mutate(type)
    setCur({
        questionId:RandomInt().toString(),
        questionDescription: "",
        courseId: "",
        pointIds: [],
        questionOption: "dsadas<>fr<>ads<>dsads",
        questionAnswerExplain: "",
        questionAnswerNum: 1,
        questionDifficulty: 1,
        questionType: type,
        rightAnswer: "A",
    })
  }
  return (
    <>
      <CreateQuestionWrapper>
        <CreateExamMenu AddQuestion={AddQuestion}/>
        <Provider value={curEdit}>
          <CreateExamRoutePage Consumer={Consumer}></CreateExamRoutePage>
        </Provider>
      </CreateQuestionWrapper>
    </>
  )
}
