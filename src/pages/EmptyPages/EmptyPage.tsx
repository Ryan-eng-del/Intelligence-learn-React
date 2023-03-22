import { Button, Empty } from 'antd'
import React from 'react'

type props = {
  description: string
  BtnText?: string
  click?: () => void
}
export const EmptyPage: React.FC<props> = ({ description, BtnText, click }) => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={<span>{description}</span>}
    >
      {BtnText && click && (
        <Button type="primary" onClick={click}>
          {BtnText}{' '}
        </Button>
      )}
    </Empty>
  )
}
