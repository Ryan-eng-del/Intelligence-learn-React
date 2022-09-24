import { ResourceType } from 'server/fetchCourseResource/types'
import React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { DownloadOutlined, EditOutlined, EyeOutlined, FileUnknownOutlined } from '@ant-design/icons'

export const ResourceCard: React.FC<{
  resourceItems: ResourceType[]
}> = ({ resourceItems }) => {
  return (
    <>
      <Row gutter={[16,16]}>
        {
          resourceItems.map(i=><>
            <Col span={3}>
              <Card
                style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
                title={<>
                  <FileUnknownOutlined
                    style={{fontSize:"64px"}}
                    />
                  <hr/>
                  <Typography.Text
                    style={{ width:"100px"}}
                    ellipsis={true}
                  >{i.resourceName}</Typography.Text>
                </>}
              >
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <EyeOutlined />
                <DownloadOutlined />
                <EditOutlined />
              </div>
              </Card>
            </Col>
          </>)
        }
      </Row>
    </>
  )
}
