import React, { useState } from 'react'
import {
  CreateExamNav,
  CreateExamRoutePage,
  CreateExamHeader,
  CreateExamMenu
} from 'components/CreateExamPage'
import { CreateExamPageWrapper } from './CreateExamPageStyle'
import { useShowTestPaper } from 'server/fetchExam/TestPaper'
import { useParams } from 'react-router-dom'
import {
  QuestionDataWithID,
  QuestionItem,
  QuestionList,
  QuestionType
} from 'server/fetchExam/types'
import { useCreateEmptyQuestion } from 'server/fetchExam'
const RandomInt = () => Math.floor(Math.random() * 1e9)

export const CreateExamPage: React.FC = () => {
  const { paperid } = useParams()

  const [dataList, setData] = useState<QuestionList[]>([])
  const { data, isLoading } = useShowTestPaper(paperid!, setData) // 打开试卷

  const { mutate } = useCreateEmptyQuestion()
  const AddQuestion = (type: QuestionType) => {
    mutate(type)
    const ChangePanel = dataList.find((i: QuestionList) => i.type === type)
    ChangePanel!.isExists = true
    ChangePanel!.amount += 1
    ChangePanel!.questiton = ChangePanel!.questiton.concat({
      score: 1, //题目在此试卷的分数
      item_data: {
        questionId: RandomInt().toString(),
        questionDescription: '<p>这里题目<strong>加粗</strong></p>',
        courseId: '',
        pointIds: [],
        questionOption:
          '<p>这里是选项A</p><><p>这里是选项B</p><><p>这里是选项C</p><><p>这里是选项D</p>',
        questionAnswerExplain: '',
        questionAnswerNum: 1,
        questionDifficulty: 1,
        questionType: type,
        rightAnswer: 'A'
      }
    })
    setData([...dataList])
  }

  // 当前编辑
  const [curEdit, setCurEdit] = useState<QuestionDataWithID>()
  const CurrentQuestionData = React.createContext(curEdit)
  const { Consumer, Provider } = CurrentQuestionData
  const FocusQuestion = (item: QuestionItem) => {
    setCurEdit(item.item_data)
  }

  const ChangleEdit = () => {
    setData([...dataList])
  }

  const changeScore = (item: QuestionItem, n: number) => {
    item.score += n
    if (item.score <= 0) item.score = 1
    setData([...dataList])
  }

  return (
    <>
      <CreateExamPageWrapper>
        <CreateExamHeader name={data?.paperName} id={paperid} />
        <div style={{ display: 'flex', height: '500px' }}>
          <CreateExamNav
            isLoading={isLoading}
            questionList={dataList}
            focus={FocusQuestion}
            changeScore={changeScore}
          />
          <div style={{ width: '80%' }}>
            {/* 添加按钮 */}
            <CreateExamMenu AddQuestion={AddQuestion} allowBank />
            {/* 提供当前编辑的题目数据 */}
            <Provider value={curEdit}>
              <CreateExamRoutePage
                Consumer={Consumer}
                dispatch={ChangleEdit}
              ></CreateExamRoutePage>
            </Provider>
          </div>
        </div>
      </CreateExamPageWrapper>
    </>
  )
}
