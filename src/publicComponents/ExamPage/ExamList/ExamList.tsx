import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  ArrowRightOutlined,
  AreaChartOutlined,
  DeliveredProcedureOutlined
} from '@ant-design/icons'
import { StatisticsPanel } from '../StatisticsPanel/StatisticsPanel'
import { PublishPanel } from '../PublishPanel/PublishPanel'
import { useShowExamList } from 'server/fetchExam'
import { ExamListItem } from 'server/fetchExam/types'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'


export const ExamList: React.FC = () => {
  const navigate = useNavigate()
  const [statistics, setStatistics] = useState(false)
  const [publish, setPublish] = useState(false)
  const columns: ColumnsType<ExamListItem> = [
    {
      title: '试卷名字',
      dataIndex: 'paperName',
      key: 'paperName'
    },
    {
      title: '完成状态',
      dataIndex: 'isRelease',
      key: 'status'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <>
          <Space size="middle">
            <Button
              icon={<AreaChartOutlined />}
              onClick={() => setStatistics(true)}
            >
              统计
            </Button>
            <Button
              icon={<DeliveredProcedureOutlined />}
              onClick={() => setPublish(true)}
            >
              发布
            </Button>
            <Button
              icon={<ArrowRightOutlined />}
              onClick={() => navigate('/editpaper')}
            >
              编辑
            </Button>
          </Space>
        </>
      )
    }
  ]


  const { data, isLoading } = useShowExamList("这个应该是课程ID")
  return (
    isLoading ? <BaseLoading /> : <>
      <Table columns={columns} dataSource={data!} rowKey='paperId'/>
      <StatisticsPanel
        visible={statistics}
        close={() => setStatistics(false)}
      />
      <PublishPanel visible={publish} close={() => setPublish(false)} />
    </>
  )
}
