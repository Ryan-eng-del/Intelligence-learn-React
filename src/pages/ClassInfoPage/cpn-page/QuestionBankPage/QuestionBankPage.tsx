import React, { useState } from 'react'
import { QuestionBankHeader, QuestionBankTable } from 'components/QuestionBankPage'
import { QuestionBankPageWrapper } from './QuestionBankPageStyle'
import { useShowCreateQuestion } from 'server/fetchExam'
import { Item } from 'server/fetchExam/types'
import { GlobalHeader } from '../../../../publicComponents/GlobalHeader/index'

export const QuestionBankPage: React.FC = () => {
  const { data, isLoading } = useShowCreateQuestion('课程id')
  const originData: Item[] = []
  const length = data?.length || 0
  const [curData, setCurData] = useState<Item[]>([])
  const [isAll, setIsAll] = useState(true)
  const handleType = (type: number): string => {
    switch (type) {
      case 0:
        return '单选题'
      case 1:
        return '多选题'
      case 2:
        return '判断题'
      case 3:
        return '填空题'
      default:
        return ''
    }
  }

  const handleRate = (rate: number): string => {
    switch (rate) {
      case 0:
        return '易'
      case 1:
        return '中'
      case 2:
        return '难'
      default:
        return ''
    }
  }

  for (let i = 0; i < length; i++) {
    originData.push({
      key: data![i].questionId,
      question: data![i].questionDescription,
      rate: handleRate(data![i].questionDifficulty),
      type: handleType(data![i].questionType),
      creator: '莉塔',
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
