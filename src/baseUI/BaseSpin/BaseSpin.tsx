import { Spin, Typography } from 'antd'
import React from 'react'
import { SpinWrapper } from './BaseSpinStyle'

export const BaseSpin: React.FC<{
  title: string
  style?: React.CSSProperties
}> = ({ title, style }) => {
  return (
    <SpinWrapper style={style}>
      <Spin size="large" style={{ marginBottom: '12px' }} />
      <Typography.Text style={{ display: 'block' }}>{title}</Typography.Text>
    </SpinWrapper>
  )
}
