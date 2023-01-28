import { Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useUserInfo } from 'context/UserInfoContext'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetStuExam } from 'server/fetchExam'

const statusType = {
  undone: '未提交',
  Correcting: '待批改'
}

type TableType = {
  key: string
  Course: string
  name: string
  status: number
  deadline: string
}

const ExamSummary: React.FC = () => {
  const navigate = useNavigate()
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
          <Button
            type="primary"
            onClick={() => {
              navigate(`/homework/${record.key}`, { replace: true })
            }}
          >
            去完成
          </Button>
        ) : record.status === statusType.Correcting ? (
          <Button>去修改</Button>
        ) : (
          <></>
        )
    }
  ]

  const { userInfo } = useUserInfo()

  const { data } = useGetStuExam(userInfo?.name || 'userName_refresh')

  // const data = useGetExam()

  console.log(data, 'data')

  /* 撤销发布试卷 */
  // client.delete({ url: '/paper/teacher/revoke/1559401362804965379' }).then(() => {
  //   console.log('success')
  // })

  return (
    <>
      <GlobalHeader title="作业和考试"></GlobalHeader>

      <GlobalRightLayout>{/* <Table columns={columns} dataSource={data} pagination={false} /> */}</GlobalRightLayout>
    </>
  )
}

export default ExamSummary
