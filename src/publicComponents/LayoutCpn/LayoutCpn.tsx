import React from 'react'
import { Col, Row } from 'antd'
export const LayoutCpn: React.FC<{ layoutLeft: any; layoutRight: any }> = (
  props
) => {
  return (
    <Row gutter={100} style={{ width: '100%', margin: 0 }}>
      <Col span={5}>
        <props.layoutLeft />
      </Col>
      <Col span={19}>
        <props.layoutRight />
      </Col>
    </Row>
  )
}
