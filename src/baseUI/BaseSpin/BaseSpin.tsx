import { Spin, Typography } from 'antd'
import React from 'react'
import { SpinWrapper } from './BaseSpinStyle'

interface BaseSpinProps extends React.ComponentProps<typeof Spin> {
  title: string
  style?: React.CSSProperties
}

export const BaseSpin = ({ title, style }: BaseSpinProps) => {
  return (
    <SpinWrapper style={style}>
      <Spin style={{ marginBottom: '12px' }} />
      <Typography.Text style={{ display: 'block' }}>{title}</Typography.Text>
    </SpinWrapper>
  )
}
