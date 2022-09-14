import React, { useReducer, useState} from 'react'
import {
  CreateExamNav,
  CreateExamRoutePage,
  CreateExamHeader,
  CreateExamMenu
} from 'components/CreateExamPage'
import { CreateExamPageReducer, initialState } from './config/reducer'
import { CreateExamPageWrapper } from './CreateExamPageStyle'
import { useShowTestPaper } from 'server/fetchExam/TestPaper'
import { useParams } from 'react-router-dom'
import { QuestionItem, QuestionList, QuestionType } from 'server/fetchExam/types'


export const CreateExamPage: React.FC = () => {
  const { paperid } = useParams()
  const { data, isLoading } = useShowTestPaper(paperid)   // 打开试卷

  // 将WholeQuestion[]转换成QuestionList[] （分组操作）
  const NavList: QuestionList[] = [
    // { type: QuestionType.single, amount: 0, isExists: true, questiton:
    //   data!.questionOfPaperVos.filter((i)=>i.questionType===QuestionType.single) // 这里是过滤了类型的WholeQuestion[]
    //   .map(i=>(
    //     {
    //       score:1,
    //       item_key:i.questionId,
    //       item_preview:i.questionAnswerDescription,
    //       item_data: {
    //         questionDescription: i.questionAnswerDescription,
    //         pointIds: i.points,
    //         courseId: "1",
    //         questionAnswerDescription: i.questionAnswerDescription,
    //         questionAnswerNum: 1,
    //         questionDifficulty: 1,
    //         questionType: 1,
    //         rightAnswer: "string"
    //       }
    //     }
    //   ))
    // },  // for
    { type: QuestionType.single, amount: 0, isExists: false, questiton:[]},
    { type: QuestionType.multiple, amount: 0, isExists: false, questiton:[]},
    { type: QuestionType.fillBlank, amount: 0, isExists: false, questiton:[]},
    { type: QuestionType.shortAnswer, amount: 0, isExists: false, questiton:[]},
    { type: QuestionType.programming, amount: 0, isExists: false, questiton:[]},
    { type: QuestionType.judge, amount: 0, isExists: false, questiton:[]}
  ]
  //
  const [dataList,setData] = useState(NavList)
  const AddQuestion = (type: QuestionType) => {
    const ChangePanel = dataList.find(i=>i.type === type)
    ChangePanel!.isExists = true
    ChangePanel!.questiton = ChangePanel!.questiton.concat(
      {
      uploaded: false,
      score: 1, //题目在此试卷的分数
      item_key: "123123213123", //题目id
      item_preview: "未编辑", //题目在侧边栏的预览文字
      item_data: {
        questionDescription: "",
        courseId: "",
        pointIds: [],
        questionAnswerDescription: "",
        questionAnswerNum: 1,
        questionDifficulty: 1,
        questionType: type,
        rightAnswer: "A",
      }
      }
    )
    setData([...dataList]);
  }

  // 当前编辑
  const [curEdit,setCurEdit] = useState<QuestionItem>()
  const CurrentQuestionData = React.createContext(curEdit)
  const { Consumer, Provider } = CurrentQuestionData
  const FocusQuestion =  (item: QuestionItem) => {
    setCurEdit(item)
  }
  return (
    <>
      <CreateExamPageWrapper>
        <CreateExamHeader name={data?.paperName} id={paperid} />
        <div style={{ display: 'flex', height: '500px' }}>
          <CreateExamNav questionList={dataList} focus={FocusQuestion}/>
          <div style={{ width: '80%' }}>
            {/* 添加按钮 */}
              <CreateExamMenu dispatch={AddQuestion}/>
            {/* 提供当前编辑的题目数据 */}
            <Provider value={curEdit}>
              <CreateExamRoutePage Consumer={Consumer} ></CreateExamRoutePage>
            </Provider>
          </div>
        </div>
      </CreateExamPageWrapper>
    </>
  )
}


