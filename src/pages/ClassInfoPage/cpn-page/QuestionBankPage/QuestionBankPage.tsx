import React, { useState } from 'react'
import { QuestionBankHeader, QuestionBankTable } from 'components/QuestionBankPage'
import { QuestionBankPageWrapper } from './QuestionBankPageStyle'
import { useShowCreateQuestion } from 'server/fetchExam'
import { GlobalHeader } from '../../../../publicComponents/GlobalHeader/index'
import { Item, QuestionType } from 'server/fetchExam/types'
import { config } from 'server/fetchExam/config'
import { useCurrentClassInfo } from 'context/ClassInfoContext'

export const QuestionBankPage: React.FC = () => {
  const { classInfo } = useCurrentClassInfo()
  const { data, isLoading } = useShowCreateQuestion(classInfo.courseId)
  const originData: Item[] = []
  const length = data?.length || 0
  const [curData, setCurData] = useState<Item[]>([])
  const [isAll, setIsAll] = useState(true)
  const handleType = (type: QuestionType): string => {
    return config[type].name
  }

  const handleRate = {0:"易",1:"中",2:"难"}

  for (let i = 0; i < length; i++) {
    originData.push({
      key: data![i].questionId,
      question: data![i].questionDescription,
      rate: handleRate[data![i].questionDifficulty as 0|1|2],
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
      // setCurData(originData.filter((item) => item.question.indexOf(value)))
      // setIsAll(false)
    }
  }

  return (
    <>
      <GlobalHeader title="题库"></GlobalHeader>
      <QuestionBankPageWrapper>
        <QuestionBankHeader changeType={changeType} showAll={showAll} search={search}></QuestionBankHeader>
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
