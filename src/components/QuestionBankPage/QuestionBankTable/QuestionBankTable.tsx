import React, { useState } from 'react'
import { Table } from 'antd'
import {
  QuestionBankTableWrapper,
  TotalQuestionWrapper,
  ShowQuestionDetails
} from './QuestionBankTableStyle'
import { useShowCreateQuestion } from 'server/fetchExam'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { useNavigate } from 'react-router-dom'

export const QuestionBankTable: React.FC = () => {
  const navigate = useNavigate()
  const columns = [
    {
      title: '题目',
      dataIndex: 'question',
      width: '40%',
      ellipsis: true,
      render: (text: string) => (
        <ShowQuestionDetails
          onClick={() => {
            navigate('/preview')
          }}
        >
          {text}
        </ShowQuestionDetails>
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
      width: '8%'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time'
    },
    {
      title: '操作',
      width: '20%',
      render: () => (
        <>
          <button>展示详情</button>
          <button style={{ marginLeft: '15px' }}>删除</button>
          <button style={{ marginLeft: '15px' }}>编辑</button>
        </>
      )
    }
  ]

  const QuestionList = []

  //网络请求返回一个列表
  const { data, isLoading } = useShowCreateQuestion()

  for (let i = 0; i < data?.length; i++) {
    QuestionList.push({
      key: i,
      question: data[i].questionDescription,
      rate: data[i].questionDifficulty,
      type: data[i].questionType,
      creator: '莉塔',
      create_time: data[i].createTime,
      details: '点击展开详情'
    })
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])

  const onSelectChange = (newSelectedRowKeys: React.SetStateAction<any[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <>
      <QuestionBankTableWrapper>
        <TotalQuestionWrapper>共计{QuestionList.length}题</TotalQuestionWrapper>
        {isLoading ? (
          <BaseLoading />
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={QuestionList!}
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
