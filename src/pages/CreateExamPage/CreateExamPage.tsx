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
  const { data, isLoading } = useShowTestPaper(paperid) // 打开试卷

  // 将WholeQuestion[]转换成QuestionList[] （分组操作）
  const NavList: QuestionList[] = [
    // { type: QuestionType.single, amount: 0, isExists: true, questiton:
    //   data!.questionOfPaperVos.filter((i)=>i.questionType===QuestionType.single) // 这里是过滤了类型的WholeQuestion[]
    //   .map(i=>(
    //     {
    //       score:1,
    //       item_key:i.questionId,
    //       item_data: {
    //         questionDescription: i.questionDescription,
    //         questionOption: i.questionOption,
    //         questionDifficulty: i.questionDifficulty,
    //         questionType: i.questionType,
    //         questionAnswerNum: i.questionAnswerNum,
    //         rightAnswer: i.rightAnswer,
    //         questionAnswerExplain: i.questionAnswerExplain,
    //         courseId: "nuknowed",
    //         pointIds: i.points
    //       }
    //     }
    //   ))
    // },  // for
    { type: QuestionType.single, amount: 0, isExists: false, questiton: [] },
    { type: QuestionType.multiple, amount: 0, isExists: false, questiton: [] },
    { type: QuestionType.fillBlank, amount: 0, isExists: false, questiton: [] },
    {
      type: QuestionType.shortAnswer,
      amount: 0,
      isExists: false,
      questiton: []
    },
    {
      type: QuestionType.programming,
      amount: 0,
      isExists: false,
      questiton: []
    },
    { type: QuestionType.judge, amount: 0, isExists: false, questiton: [] }
  ]
  //
  const [dataList, setData] = useState(NavList)

  const { mutate, data: newQ } = useCreateEmptyQuestion()
  const AddQuestion = (type: QuestionType) => {
    mutate(type)
    const ChangePanel = dataList.find((i) => i.type === type)
    ChangePanel!.isExists = true
    ChangePanel!.questiton = ChangePanel!.questiton.concat({
      score: 1, //题目在此试卷的分数
      item_data: {
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
