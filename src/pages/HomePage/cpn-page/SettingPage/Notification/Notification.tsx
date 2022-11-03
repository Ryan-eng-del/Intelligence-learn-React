import { Checkbox } from 'antd'
import React from 'react'

export const Notification: React.FC = () => {
  return (
    <>
      <Checkbox>不提示推广消息</Checkbox>
      <hr />
      <Checkbox>关闭私信</Checkbox>
    </>
  )
}
