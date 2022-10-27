import { ResourceType } from 'server/fetchCourseResource/types'
import React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import {
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FileUnknownOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const ResourceCard: React.FC<{
  resourceItems: ResourceType[]
  premission: boolean
}> = ({ resourceItems, premission }) => {
  const navigate = useNavigate()
  return (
    <>
      <Row gutter={[16, 16]}>
        {resourceItems.map((i) => (
          <>
            <Col span={3}>
              <Card
                style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                title={
                  <>
                    <FileUnknownOutlined style={{ fontSize: '64px' }} />
                    <hr />
                    <Typography.Text style={{ width: '100px' }} ellipsis={true}>
                      {i.resourceName}
                    </Typography.Text>
                  </>
                }
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <EyeOutlined onClick={()=>navigate(`/resource-video/${123}`)}/>
                  <DownloadOutlined />
                  {premission ? <EditOutlined /> : <></>}
                </div>
              </Card>
            </Col>
          </>
        ))}
      </Row>
    </>
  )
}
