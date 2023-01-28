import React, { useMemo } from 'react'

import { Button, Segmented, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { useHomeWorkListPublished, useShowExamListPublished } from 'server/fetchExam/TestPaper'

enum statusType {
  'undone' = '未提交',
  'Correcting' = '待批改'
}

type TableType = {
  isReview: boolean
  paperId: string
  paperName: string
  isDone: boolean
  hasRemakeTime: number
  startTime: string
  endTime: string
}

export const StudentExamPage: React.FC<{
  classId: string
}> = ({ classId }) => {
  const navigate = useNavigate()
  const { data: dataH } = useHomeWorkListPublished(classId)
  const { data: dataE } = useShowExamListPublished(classId)
  const data = useMemo(() => (dataH && dataE ? [...dataE!, ...dataH!] : []), [dataH, dataE])
  const columns: ColumnsType<TableType> = [
    {
      key: '1',
      title: '作业名称',
      dataIndex: 'paperName'
    },
    {
      key: '2',
      title: '完成状态',
      dataIndex: 'isDone'
    },
    {
      key: '3',
      title: '截至日期',
      dataIndex: 'endTime'
    },
    {
      key: '4',
      title: '操作',
      dataIndex: 'status',
      render: (_: any, record: TableType) =>
        +record.endTime > Date.now() ? (
          <Button
            onClick={() => {
              navigate(`/previewtestpaper/${record.paperId}`, { replace: true })
            }}
          >
            查看详情
          </Button>
        ) : record.isDone ? (
          <Button
            onClick={() => {
              navigate(`/homework/${record.paperId}`, { replace: true })
            }}
          >
            去修改
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              navigate(`/homework/${record.paperId}`, { replace: true })
            }}
          >
            去完成
          </Button>
        )
    }
  ]

  return (
    <>
      <Segmented options={['全部', '考试', '作业']} size="large" />
      <Segmented options={['全部', '已完成', '未完成']} size="large" />
      <Table columns={columns} dataSource={data} />
    </>
  )
}
