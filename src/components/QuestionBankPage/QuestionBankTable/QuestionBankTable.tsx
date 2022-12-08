import React, { useState } from 'react'
import { Button, Popconfirm, Space, Table } from 'antd'
import {
  QuestionBankTableWrapper,
  QuestionOperateWrapper,
  QuestionItemWrapper,
  ShowQuestionDetails,
  TotalQuestionWrapper
} from './QuestionBankTableStyle'
import { useDeleteQuestion } from 'server/fetchExam'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { useNavigate } from 'react-router-dom'
import { ShowDetailsCell } from './cpn/ShowDetailsCell'
import { Item } from 'server/fetchExam/types'
import { isTeachAuth } from 'util/isAuthTeach'

export const QuestionBankTable: React.FC<{
  originData: Item[]
  curData: Item[]
  isLoading: boolean
  isAll: boolean
}> = ({ originData, isLoading, curData, isAll }) => {
  const navigate = useNavigate()
  // 页面状态
  const [pageSize] = useState(20)
  const [currentPage] = useState(1)
  const [showDetailsKey, setKey] = useState('')
  const isTeacher = isTeachAuth()
  // 网络请求
  const { mutate } = useDeleteQuestion()

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
                onClick={isTeacher
                ? ()=>setKey(record.key)
                : ()=>navigate(`/promote/${record.questionId}`,)
              }>
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
        return isTeacher ?<QuestionOperateWrapper>
          <Space>
            <Popconfirm onConfirm={()=>mutate(record.questionId)} title="确认删除？">
              <Button type="text" danger>删除</Button>
            </Popconfirm>
            <Button type="text" onClick={()=>navigate(`/edit/${record.questionId}`)}>编辑</Button>
          </Space>
        </QuestionOperateWrapper> : <></>
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
    <>
      <QuestionBankTableWrapper>
        {isLoading ? (
          <BaseLoading />
        ) : (
          <>
            <TotalQuestionWrapper>共计{originData?.length}题</TotalQuestionWrapper>
            <Table
              style={{fontWeight:'bold'}}
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
    </>
  )
}
