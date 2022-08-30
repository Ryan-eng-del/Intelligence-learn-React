import { Radio } from 'antd'
import React from 'react'
export const DifficultDegree: React.FC<any> = (props) => {
  const { handleEdit } = props
  return (
    <>
      <Radio.Group
        name="radiogroup"
        defaultValue={0}
        style={{ marginLeft: '15px' }}
        onChange={(e) => {
          handleEdit(e.target.value)
        }}
      >
        <Radio value={0} style={{ fontSize: '13px' }}>
          易
        </Radio>
        <Radio value={1} style={{ fontSize: '13px' }}>
          中
        </Radio>
        <Radio value={2} style={{ fontSize: '13px' }}>
          难
        </Radio>
      </Radio.Group>
    </>
  )
}
