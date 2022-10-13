import React from 'react'
import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  TitleWrapper
} from 'publicComponents/PageStyle/PageHeaderWapper'
import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { replace } from 'lodash'

enum statusType {
  'undone' = '未提交',
  'Correcting' = '待批改'
}

type TableType = {
  key: string
  name: string
  status: statusType | number
  deadline: string
}

export const StudentExamPage: React.FC<{
  classId:string
}> = (classId) => {
const navigate = useNavigate();
  const columns: ColumnsType<TableType> = [

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
        ) : record.status === statusType.undone ? (//navigate(`/editpaper/${data}`)
          <Button type="primary" onClick={()=>{
            navigate(`/homework`),{replace:true}}}>去完成</Button>
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
      name: '期末论文',
      status: statusType.undone,
      deadline: '2022-9-10 00:00'
    },
    {
      key: '2',
      name: '期中考试',
      status: statusType.Correcting,
      deadline: '2022-9-10 00:00'
    },
    {
      key: '3',
      name: '第一章作业',
      status: 70,
      deadline: '2022-9-10 00:00'
    }
  ]

  return (
    <>
        <HeaderWrapper>
          <TitleWrapper>
            <div className="page-title">我的作业 & 考试</div>
          </TitleWrapper>
        </HeaderWrapper>
        <ContentWrapper>
          <Table columns={columns} dataSource={data} />
        </ContentWrapper>
    </>
  )
}
