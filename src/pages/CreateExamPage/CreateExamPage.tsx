import React, { useState, useEffect } from 'react'
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
  QuestionType,
  TestPaper
} from 'server/fetchExam/types'
import { useCreateEmptyQuestion } from 'server/fetchExam'
import { dropRight } from 'lodash'

const RandomInt = () => Math.floor(Math.random() * 1e9)

export const CreateExamPage: React.FC = () => {
  const { paperid } = useParams()

  const [dataList, setData] = useState<QuestionList[]>([])
  const { data, isLoading } = useShowTestPaper(paperid!, setData) // 打开试卷
  const config = {
    [QuestionType.single]:{
      name:"单选题", min: 1, max: 10, defaultScore: 1
    },
    [QuestionType.multiple]:{
      name:"多选题", min: 1, max: 10, defaultScore: 2
    },
    [QuestionType.fillBlank]:{
      name:"填空题", min: 1, max: 10, defaultScore: 5
    },
    [QuestionType.shortAnswer]:{
      name:"简答题", min: 1, max: 10, defaultScore: 10
    },
    [QuestionType.judge]:{
      name:"判断题", min: 1, max: 10, defaultScore: 1
    }
  }
  const Process = (data:TestPaper) => {
    // 接下来进行数据分组
    // get enum type value and key ,
    // e.g.: enum { 'name1', 'name2' } => ['0','1','name1','name2']
    const QuestionTypeList = Object.keys(QuestionType)
    // remove:  ['0','1','name1','name2'] => [ 0, 1 ]
    const QuestionTypeList2 = dropRight(
      QuestionTypeList,
      QuestionTypeList.length / 2
    ).map((i) => parseInt(i))
    return QuestionTypeList2.map((Type: QuestionType) => {
      // 获取类型
      // 这里是过滤了类型的WholeQuestion[]
      const thisTypeList = data.questionOfPaperVos.filter(
        (i) => i.questionType === Type
      )
      return {
        type: Type,
        name: config[Type].name,
        min: config[Type].min,
        max: config[Type].max,
        defaultScore: config[Type].defaultScore,
        amount: thisTypeList.length,
        isExists: thisTypeList.length != 0,
        questiton: thisTypeList.map((i) => ({
          score: 1,
          item_key: i.questionId,
          item_data: { ...i, courseId: 'unknown' } // FIXME: 等待接口更新courseID字段
        }))
      }
    })
  }
  useEffect(( ) => {
    if(data)
      setData(Process(data));
  }, [data])
  const { mutate } = useCreateEmptyQuestion()

  const getSumScore = () =>{
    let sum = 0
    dataList.forEach(C=>{
      sum += C.questiton.reduce((p,c)=>p+c.score,0)
    })
    return sum;
  }

  const AddQuestion = (type: QuestionType) => {
    mutate(type)
    const ChangePanel = dataList.find((i: QuestionList) => i.type === type)
    ChangePanel!.isExists = true
    ChangePanel!.amount += 1
    ChangePanel!.questiton = ChangePanel!.questiton.concat({
      score: ChangePanel!.defaultScore, //题目在此试卷的分数
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
            SumScore={getSumScore}
            setConfig={()=>setData([...dataList])}
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
