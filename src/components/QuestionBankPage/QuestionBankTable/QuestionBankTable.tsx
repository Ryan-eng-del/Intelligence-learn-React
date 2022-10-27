import React, { useState } from 'react'
import { Button, Modal, Table, Typography } from 'antd'
import {
  QuestionBankTableWrapper,
  QuestionOperateWrapper,
  QuestionItemWrapper,
  ShowQuestionDetails,
  TotalQuestionWrapper
} from './QuestionBankTableStyle'
import { useDeleteQuestion, useShowCreateQuestion } from 'server/fetchExam'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ShowDetailsCell } from './cpn/ShowDetailsCell'
import { Item } from 'server/fetchExam/types'
import styled from 'styled-components'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
const { confirm } = Modal

export const QuestionBankTable: React.FC<{
  originData: Item[]
  curData: Item[]
  isLoading: boolean
  isAll: boolean
}> = ({ originData, isLoading, curData, isAll }) => {
  const navigate = useNavigate()
  //页面状态
  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [showDetailsKey, setKey] = useState('')

  //网络请求
  const { mutate } = useDeleteQuestion()

  //操作函数
  const isShow = (record: Item) => record.key === showDetailsKey

  const show = (record: Partial<Item> & { key: React.Key }) => {
    setKey(record.key)
  }

  const close = () => {
    setKey('')
  }

  const onSelectChange = (newSelectedRowKeys: React.SetStateAction<any[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  //表格配置
  const columns = [
    {
      title: '题目',
      dataIndex: 'question',
      width: '45%',
      ellipsis: true,
      showing: true,
      className: 'table-header',
      render: (_: any, record: Item) => (
        <QuestionItemWrapper>
          <CurCourseProvider>
            {({ curCourse }) => (<>
              <ShowQuestionDetails
                onClick={() => curCourse.Permission
                ? navigate(`/preview/${record.questionId}`, { replace: true })
                : navigate(`/promote/${record.questionId}`, { replace: true })}
              >
                {record.question}
              </ShowQuestionDetails>
            </>)}
          </CurCourseProvider>
          <QuestionOperateWrapper>
            <Button
              type="link"
              className="deletebtn"
              onClick={() => {
                // showDeleteConfirm(data.id)
                showDeleteConfirm(record.key)
              }}
            >
              删除
            </Button>
            <Button
              type="link"
              onClick={() => {
                navigate(`/edit/${record.questionId}`)
              }}
            >
              编辑
            </Button>
          </QuestionOperateWrapper>
        </QuestionItemWrapper>
      )
    },
    {
      title: '难易度',
      dataIndex: 'rate',
      className: 'table-header',
      width: '8%'
    },
    {
      title: '类型',
      dataIndex: 'type',
      className: 'table-header',
      width: '8%'
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      className: 'table-header',
      width: '10%'
    },
    {
      title: '创建时间',
      width: '15%',
      className: 'table-header',
      dataIndex: 'create_time'
    },
    {
      title: '操作',
      className: 'table-header',
      render: (_: any, record: Item) => {
        //record是全部数据
        const editable = isShow(record)
        return editable ? (
          <Typography.Link onClick={close}>关闭详情</Typography.Link>
        ) : (
          <Typography.Link onClick={() => show(record)}>
            展开详情
          </Typography.Link>
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
    <>
      <QuestionBankTableWrapper>
        {isLoading ? (
          <BaseLoading style={{ margin: '100px auto' }} />
        ) : (
          <>
            <TotalQuestionWrapper>
              共计{originData?.length}题
            </TotalQuestionWrapper>
            <Table
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
                onChange: (page, pageSize) => {
                  setPageSize(pageSize), setCurrentPage(page)
                },
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
