import { Input, Rate, Space } from 'antd'
import { QuestionBankHeader, QuestionBankTable } from 'components/QuestionBankPage'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import Skeletons from 'publicComponents/Skeleton'
import React, { useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useShowCreateQuestion } from 'server/fetchExam'
import { config } from 'server/fetchExam/config'
import { Item, QuestionType } from 'server/fetchExam/types'
import { isTeachAuth } from 'util/isAuthTeach'
import { GlobalRightLayout } from '../../../../publicComponents/GlobalLayout/style'

const QuestionBankPage: React.FC = () => {
  const { data, isLoading } = useShowCreateQuestion(useParams()['id']!)
  const originData: Item[] = []
  const length = data?.length || 0
  const [curData, setCurData] = useState<Item[]>([])
  const [isAll, setIsAll] = useState(true)
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
      return
    } else {
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
      <GlobalRightLayout>
        <QuestionBankHeader changeType={changeType} showAll={showAll}></QuestionBankHeader>
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
      </GlobalRightLayout>
      <Outlet />
    </>
  )
}

export default QuestionBankPage
