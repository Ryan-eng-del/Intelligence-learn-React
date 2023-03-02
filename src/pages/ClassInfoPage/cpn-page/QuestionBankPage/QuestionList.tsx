import { CaretUpOutlined } from '@ant-design/icons'
import { Rate } from 'antd'
import { QuestionBankHeader, QuestionBankTable } from 'components/QuestionBankPage'
import Skeletons from 'publicComponents/Skeleton'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useShowCreateQuestion } from 'server/fetchExam'
import { config } from 'server/fetchExam/config'
import { Item, QuestionType } from 'server/fetchExam/types'
import { isTeachAuth } from 'util/isAuthTeach'
import { TableWapper } from './QuestionBankPageStyle'

export const QuestionList: React.FC<{
  TargetRef: React.MutableRefObject<HTMLDivElement | null>
  move: () => any
}> = ({ TargetRef, move }) => {
  const { data, isLoading } = useShowCreateQuestion(useParams()['id']!)
  const length = data?.length || 0
  const originData: Item[] = []
  const [curData, setCurData] = useState<Item[]>([])
  const [isAll, setIsAll] = useState(true)
  const isTeacher = isTeachAuth()
  const changeType = (type: string) => {
    setCurData(originData.filter((item) => item.type === type))
    setIsAll(false)
  }

  const handleType = (type: QuestionType): string => {
    return config[type]?.name
  }
  const handleRate = (n: number) => <Rate value={n + 1} disabled count={3} />
  // TODO:奇怪的类型映射。应该修改
  for (let i = 0; i < length; i++) {
    originData.push({
      key: data![i].questionId,
      question: data![i].questionDescription,
      rate: handleRate(data![i].questionDifficulty),
      type: handleType(data![i].questionType),
      create_time: data![i].createTime,
      questionId: data![i].questionId,
      rightAnswer: data![i].rightAnswer,
      questionOption: data![i].questionOption
    })
  }

  const search = (value: string) => {
    if (value === '') {
      return
    } else {
      setCurData(originData.filter((item) => item.question.indexOf(value)))
      setIsAll(false)
    }
  }
  const showAll = () => {
    setCurData([...originData])
    setIsAll(true)
  }
  return (
    <TableWapper ref={TargetRef}>
      {!isTeacher ? (
        <div className="back" onClick={move}>
          <CaretUpOutlined />
        </div>
      ) : (
        <></>
      )}

      <QuestionBankHeader changeType={changeType} showAll={showAll} search={search}></QuestionBankHeader>

      {isLoading ? (
        <Skeletons size="middle" />
      ) : (
        <QuestionBankTable
          // 选中展开的数据
          curData={curData}
          // 全部数据
          originData={originData}
          // 搜索控制
          isAll={isAll}
        ></QuestionBankTable>
      )}
    </TableWapper>
  )
}
