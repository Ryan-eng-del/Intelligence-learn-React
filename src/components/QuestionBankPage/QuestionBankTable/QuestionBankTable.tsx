import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Table } from 'antd'
import Skeletons from 'publicComponents/Skeleton/index'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteQuestion } from 'server/fetchExam'
import { Item } from 'server/fetchExam/types'
import { isTeachAuth } from 'util/isAuthTeach'
import { ShowDetailsCell } from './cpn/ShowDetailsCell'
import {
  QuestionBankTableWrapper,
  QuestionItemWrapper,
  QuestionOperateWrapper,
  ShowQuestionDetails,
  TotalQuestionWrapper
} from './QuestionBankTableStyle'
const { confirm } = Modal

export const QuestionBankTable: React.FC<{
  originData: Item[]
  curData: Item[]
  isLoading: boolean
  isAll: boolean
}> = ({ originData, isLoading, curData, isAll }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const navigate = useNavigate()
  // 页面状态
  const [pageSize] = useState(20)
  const [currentPage] = useState(1)
  const [showDetailsKey, setKey] = useState('')
  const isTeacher = isTeachAuth()
  // 网络请求
  const { mutate } = useDeleteQuestion()
  const onSelectChange = (newSelectedRowKeys: React.SetStateAction<any[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: '您确定要删除这道题吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后，您可以在回收站中找回这道题',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      width: '35vw',
      centered: true,
      onOk() {
        mutate(id)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  // 操作函数
  const isShow = (record: Item) => record.key === showDetailsKey

  // 表格配置
  const columns = [
    {
      title: '题目',
      dataIndex: 'question',
      width: '40%',
      ellipsis: true,
      showing: true,
      className: 'table-header',
      render: (_: any, record: Item) => (
        <QuestionItemWrapper>
          <ShowQuestionDetails
            onClick={isTeacher ? () => setKey(record.key) : () => navigate(`/promote/${record.questionId}`)}
          >
            {record.question}
          </ShowQuestionDetails>
        </QuestionItemWrapper>
      )
    },
    {
      title: '难易度',
      dataIndex: 'rate',
      className: 'table-header',
      width: '12%'
    },
    {
      title: '类型',
      dataIndex: 'type',
      className: 'table-header',
      width: '8%'
    },
    {
      title: '创建时间',
      width: '20%',
      className: 'table-header',
      dataIndex: 'create_time'
    },
    {
      title: '操作',
      className: 'table-header',
      render: (_: any, record: Item) => {
        return isTeacher ? (
          <QuestionOperateWrapper>
            <Space>
              <Button type="primary" danger onClick={() => showDeleteConfirm(record.questionId)}>
                删除
              </Button>
              <Button type="primary" onClick={() => navigate(`/edit/${record.questionId}`)}>
                编辑
              </Button>
            </Space>
          </QuestionOperateWrapper>
        ) : (
          <></>
        )
      }
    }
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.showing) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        title: col.title,
        editing: isShow(record)
      })
    }
  })

  return (
    <QuestionBankTableWrapper>
      {isLoading ? (
        <Skeletons size="middle" />
      ) : (
        <>
          <TotalQuestionWrapper>共计{originData?.length}题</TotalQuestionWrapper>
          <Table
            style={{ fontWeight: 'bold' }}
            rowSelection={rowSelection}
            columns={mergedColumns}
            dataSource={isAll ? originData : curData}
            components={{
              body: {
                cell: ShowDetailsCell
              }
            }}
            pagination={{
              position: ['bottomCenter'],
              showSizeChanger: true,
              pageSize: pageSize,
              style: {
                paddingBottom: '10px',
                fontSize: '17px'
              },
              current: currentPage,
              pageSizeOptions: ['20', '30', '50', '100']
            }}
            rowClassName="rowStyle"
          />
        </>
      )}
    </QuestionBankTableWrapper>
  )
}
