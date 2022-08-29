import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowRightOutlined, AreaChartOutlined, DeliveredProcedureOutlined,  } from '@ant-design/icons'
import { StatisticsPanel } from '../StatisticsPanel/StatisticsPanel';
import { PublishPanel } from '../PublishPanel/PublishPanel';
interface DataType {
  key: string;
  name: string;
  status: string;
}

export const ExamList: React.FC = () => {
  const navigate = useNavigate()
  // const [hover,setHover] = useState<DataType>()
  const [statistics,setStatistics] = useState(false)
  const [publish,setPublish] = useState(false)
  const columns: ColumnsType<DataType> = [
    {
      title: '试卷名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '完成状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <>
            <Space size="middle">
              <Button icon={<AreaChartOutlined />} onClick={()=>setStatistics(true)}>统计</Button>
              <Button icon={<DeliveredProcedureOutlined />} onClick={()=>setPublish(true)}>发布</Button>
              <Button icon={<ArrowRightOutlined />} onClick={() => navigate('/createexam')}>编辑</Button>
            </Space>
        </>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: '作业1',
      status: "未发布",
    },
    {
      key: '2',
      name: '作业2',
      status: "30/50",
    },
    {
      key: '3',
      name: '作业3',
      status: "已定时",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
      />
      <StatisticsPanel
        visible={statistics}
        close={()=>setStatistics(false)}
      />
      <PublishPanel
        visible={publish}
        close={()=>setPublish(false)}
      />

    </>
  )
}
