import React from 'react'
import { HeaderWrapper } from 'publicComponents/PageStyle/PageHeaderWapper'
import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { GlobalHeader } from '../../../../publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout'

enum statusType {
  'undone' = '未提交',
  'Correcting' = '待批改'
}

type TableType = {
  key: string
  Course: string
  name: string
  status: statusType | number
  deadline: string
}

export const ExamSummary: React.FC = () => {
  const columns: ColumnsType<TableType> = [
    {
      title: '来源课程',
      dataIndex: 'Course'
    },
    {
      title: '作业名称',
      dataIndex: 'name'
    },
    {
      title: '完成状态',
      dataIndex: 'status'
    },
    {
      title: '截至日期',
      dataIndex: 'deadline'
    },
    {
      title: '操作',
      dataIndex: 'status',
      render: (_: any, record: TableType) =>
        typeof record.status === 'number' ? (
          <Button>查看详情</Button>
        ) : record.status === statusType.undone ? (
          <Button type="primary">去完成</Button>
        ) : record.status === statusType.Correcting ? (
          <Button>去修改</Button>
        ) : (
          <></>
        )
    }
  ]
  const data: TableType[] = [
    {
      key: '1',
      Course: '马原',
      name: '期末论文',
      status: statusType.undone,
      deadline: '2022-9-10 00:00'
    },
    {
      key: '2',
      Course: '毛概',
      name: '期中考试',
      status: statusType.Correcting,
      deadline: '2022-9-10 00:00'
    },
    {
      key: '3',
      Course: '离散数学',
      name: '第一章作业',
      status: 70,
      deadline: '2022-9-10 00:00'
    }
  ]

  return (
    <>
      <>
        <HeaderWrapper>
          <GlobalHeader title="我的作业和考试"></GlobalHeader>
        </HeaderWrapper>
        <GlobalRightLayout>
          <Table columns={columns} dataSource={data} />
        </GlobalRightLayout>
      </>
    </>
  )
}
