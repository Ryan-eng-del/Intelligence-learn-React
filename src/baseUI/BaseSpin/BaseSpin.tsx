import { Spin, Typography } from 'antd'
import React from 'react'
import { SpinWrapper } from './BaseSpinStyle'

interface BaseSpinProps extends React.ComponentProps<typeof Spin> {
  title?: string
  style?: React.CSSProperties
}

export const BaseSpin = (props: BaseSpinProps) => {
  return (
    <SpinWrapper style={props.style}>
      <Spin {...props} size={'large'} />
      <Typography.Text style={{ display: 'block', marginTop: '15px' }}>{props?.title}</Typography.Text>
    </SpinWrapper>
  )
}
