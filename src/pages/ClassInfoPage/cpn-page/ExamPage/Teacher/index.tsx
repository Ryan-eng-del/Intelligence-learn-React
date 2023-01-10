import { AreaChartOutlined, ArrowRightOutlined, DeliveredProcedureOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PublishPanel } from 'publicComponents/ExamPage/PublishPanel/PublishPanel'
import { StatisticsPanel } from 'publicComponents/ExamPage/StatisticsPanel/StatisticsPanel'
import { useGetPaperTarget, useShowExamList } from 'server/fetchExam'
import { ExamListItem } from 'server/fetchExam/types'
import Skeletons from 'publicComponents/Skeleton/index'

export const ExamList: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { data, isLoading } = useShowExamList(courseId)
  const { data: paperTarget } = useGetPaperTarget(courseId)
  const navigate = useNavigate()
  const [statistics, setStatistics] = useState(false)
  const [publish, setPublish] = useState(false)
  const [paper_id, setPaperId] = useState('')

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
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button icon={<AreaChartOutlined />} onClick={() => setStatistics(true)}>
              统计
            </Button>
            <Button
              icon={<DeliveredProcedureOutlined />}
              onClick={() => {
                // console.log(paperId);
                setPaperId(record.paperId)
                setPublish(true)
              }}
            >
              发布
            </Button>
            <Button icon={<ArrowRightOutlined />} onClick={() => navigate(`/previewtestpaper/${record.paperId}`)}>
              打开
            </Button>
          </Space>
        </>
      )
    }
  ]

  return isLoading ? (
    <Skeletons size="middle" />
  ) : (
    <>
      <Table columns={columns} dataSource={data!} rowKey="paperId" />
      <StatisticsPanel visible={statistics} close={() => setStatistics(false)} />
      <PublishPanel
        visible={publish}
        close={() => {
          setPublish(false)
        }}
        studentTree={paperTarget!}
        paperId={paper_id}
      />
    </>
  )
}
