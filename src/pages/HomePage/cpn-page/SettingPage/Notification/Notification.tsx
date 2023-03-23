import { Checkbox } from 'antd'
import { Unaccomplished } from 'publicComponents/Unaccomplished'
import React from 'react'

export const Notification: React.FC = () => {
  return (
    <>
      <Unaccomplished>无接口</Unaccomplished>
      <Checkbox>不提示推广消息</Checkbox>
      <hr />
      <Checkbox>关闭私信</Checkbox>
    </>
  )
}
