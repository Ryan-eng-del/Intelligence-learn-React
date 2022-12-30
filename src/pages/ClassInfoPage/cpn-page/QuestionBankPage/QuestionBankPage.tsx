import React, { useState } from 'react'
import { QuestionBankHeader, QuestionBankTable } from 'components/QuestionBankPage'
import { QuestionBankPageWrapper } from './QuestionBankPageStyle'
import { useShowCreateQuestion } from 'server/fetchExam'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { Item, QuestionType } from 'server/fetchExam/types'
import { config } from 'server/fetchExam/config'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { Input, Rate, Space } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { PrimaryButton } from 'publicComponents/Button'
import { isTeachAuth } from 'util/isAuthTeach'

const QuestionBankPage: React.FC = () => {
  const { classInfo, getCurCourseInfo } = useCurrentClassInfo()
  console.log(classInfo)
  // getCurCourseInfo(useParams()['id']!)
  const { data, isLoading } = useShowCreateQuestion(useParams()['id']!)
  // const { data, isLoading } = useShowCreateQuestion(classInfo.courseId)
  const originData: Item[] = []
  const length = data?.length || 0
  const [curData, setCurData] = useState<Item[]>([])
  const [isAll, setIsAll] = useState(true)
  const handleType = (type: QuestionType): string => {
    return config[type].name
  }

  const handleRate = (n: number) => <Rate value={n + 1} disabled count={3} />

  for (let i = 0; i < length; i++) {
    originData.push({
      key: data![i].questionId,
      question: data![i].questionDescription,
      rate: handleRate(data![i].questionDifficulty),
      type: handleType(data![i].questionType.toString() as QuestionType),
      create_time: data![i].createTime,
      questionId: data![i].questionId,
      rightAnswer: data![i].rightAnswer,
      questionOption: data![i].questionOption
    })
  }

  const changeType = (type: string) => {
    setCurData(originData.filter((item) => item.type === type))
    setIsAll(false)
  }

  const showAll = () => {
    setCurData([...originData])
    setIsAll(true)
  }

  const search = (value: string) => {
    if (value === '') {
      console.log('内容为空')
      return
    } else {
      console.log('有内容')
      setCurData(originData.filter((item) => item.question.indexOf(value)))
      setIsAll(false)
    }
  }
  const id = useParams()['id']
  const isTeacher = isTeachAuth()
  const navigate = useNavigate()
  return (
    <>
      <GlobalHeader
        title="题库"
        tool={
          <Space>
            <Input.Search allowClear size="large" onSearch={(value) => search(value)} />
            {isTeacher && (
              <PrimaryButton title="添加题目" handleClick={() => navigate('../createquestion', { replace: true })} />
            )}
          </Space>
        }
      ></GlobalHeader>
      <QuestionBankPageWrapper>
        {/* <Button onClick={()=>(getCurCourseInfo(id!),console.log(classInfo.courseId))}>Magic</Button> */}
        <QuestionBankHeader changeType={changeType} showAll={showAll}></QuestionBankHeader>
        <QuestionBankTable
          curData={curData}
          originData={originData}
          isLoading={isLoading}
          isAll={isAll}
        ></QuestionBankTable>
      </QuestionBankPageWrapper>
    </>
  )
}

export default QuestionBankPage
