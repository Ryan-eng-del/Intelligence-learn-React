import { CaretUpOutlined } from '@ant-design/icons'
import { QuestionBankHeader, QuestionBankTable } from 'components/QuestionBankPage'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { useMount } from 'hook/useMount'
import Skeletons from 'publicComponents/Skeleton'
import React, { useEffect, useState } from 'react'
import { useShowCreateQuestion, useWrongQuestionList } from 'server/fetchExam'
import { QuestionBank } from 'server/fetchExam/types'
import { isTeachAuth } from 'util/isAuthTeach'
import { TableWapper } from './QuestionBankPageStyle'

export const QuestionList: React.FC<{
  init?: any
  TargetRef: React.MutableRefObject<HTMLDivElement | null>
  wrongRef: React.MutableRefObject<HTMLElement | null>
  move: () => any
}> = ({ TargetRef, move, init, wrongRef }) => {
  const { classInfo } = useCurrentClassInfo()
  const { data, isLoading } = useShowCreateQuestion(classInfo.courseId)
  const [curData, setCurData] = useState<QuestionBank[]>([])
  const isTeacher = isTeachAuth()
  const { data: wrongList } = useWrongQuestionList(classInfo.courseId)

  const wrong = (isWrong: boolean) => {
    isWrong ? setCurData(wrongList!) : setCurData(data!)
  }
  useMount(() => init?.wrong)
  useEffect(() => {
    data && setCurData(data)
  }, [data])

  return (
    <TableWapper ref={TargetRef}>
      {!isTeacher && (
        <div className="back" onClick={move}>
          <CaretUpOutlined />
        </div>
      )}
      <QuestionBankHeader
        wrong={wrong}
        ref={wrongRef}
        dataLen={curData?.length}
        clickfilter={(filter) => {
          // TODO: 这里从错题会跳回全部题
          data && setCurData(data.filter(filter))
        }}
      />
      {isLoading ? (
        <Skeletons size="large" />
      ) : (
        <QuestionBankTable
          // 选中展开的数据
          curData={curData}
        ></QuestionBankTable>
      )}
    </TableWapper>
  )
}
