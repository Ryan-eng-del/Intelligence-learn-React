import React, { useState } from 'react'
import { Button, Modal, Table, Typography } from 'antd'
import {
  QuestionBankTableWrapper,
  QuestionDetailsWrapper,
  QuestionItemWrapper,
  ShowQuestionDetails,
  TotalQuestionWrapper
} from './QuestionBankTableStyle'
import { useDeleteQuestion, useShowCreateQuestion } from 'server/fetchExam'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { useNavigate } from 'react-router-dom'
import { Item, ShowDetailsCellProps } from '../type'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ShowDetailsCell } from './cpn/ShowDetailsCell'
const { confirm } = Modal

export const QuestionBankTable: React.FC = () => {
  const navigate = useNavigate()
  const originData: Item[] = []
  //页面状态
  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [showDetailsKey, setKey] = useState('')

  //网络请求
  const { data, isLoading } = useShowCreateQuestion()
  const { mutate } = useDeleteQuestion()

  //添加数据
  for (let i = 0; i < data?.length; i++) {
    originData.push({
      key: i.toString(),
      question: data[i].questionDescription,
      rate: data[i].questionDifficulty,
      type: data[i].questionType,
      creator: '莉塔',
      create_time: data[i].createTime,
      questionId: data[i].questionId,
      rightAnswer: data[i].rightAnswer,
      questionOption: data[i].questionOption
    })
  }

  //操作函数
  const isShow = (record: Item) => record.key === showDetailsKey

  const show = (record: Partial<Item> & { key: React.Key }) => {
    setKey(record.key)
  }

  const close = () => {
    setKey('')
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
        console.log('成功')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const onSelectChange = (newSelectedRowKeys: React.SetStateAction<any[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
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
      render: (_: any, record: Item) => (
        <QuestionItemWrapper>
          <ShowQuestionDetails
            onClick={() => {
              navigate(`/preview/${record.questionId}`, { replace: true })
            }}
          >
            {record.question}
          </ShowQuestionDetails>

          <QuestionDetailsWrapper>
            <Button
              type="link"
              className="deletebtn"
              onClick={() => {
                showDeleteConfirm(data.id)
              }}
            >
              删除
            </Button>
            <Button type="link">编辑</Button>
          </QuestionDetailsWrapper>
        </QuestionItemWrapper>
      )
    },
    {
      title: '难易度',
      dataIndex: 'rate',
      width: '8%'
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: '8%'
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      width: '10%'
    },
    {
      title: '创建时间',
      width: '15%',
      dataIndex: 'create_time'
    },
    {
      title: '操作',
      render: (_: any, record: Item) => {
        //record是全部数据
        const editable = isShow(record)
        return editable ? (
          <span>
            <Typography.Link onClick={close}>关闭详情</Typography.Link>
          </span>
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
        <TotalQuestionWrapper>共计{data?.length}题</TotalQuestionWrapper>
        {isLoading ? (
          <BaseLoading />
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={mergedColumns}
            dataSource={originData!}
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
          />
        )}
      </QuestionBankTableWrapper>
    </>
  )
}
