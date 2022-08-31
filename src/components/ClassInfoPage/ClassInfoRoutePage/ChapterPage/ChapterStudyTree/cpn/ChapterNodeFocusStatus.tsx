import React from 'react'
import { Button, Input } from 'antd'
import { stopPropagation } from 'util/stopPropagation'

export const ChapterNodeFocusStatus: React.FC<{
  setAddInputValue: any
  confirmAdd: any
  cancelAdd: any
}> = ({ setAddInputValue, confirmAdd, cancelAdd }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Input
        autoFocus
        onChange={(e) => setAddInputValue(e.target.value)}
        style={{ marginRight: '12px' }}
        onClick={(e) => e.stopPropagation()}
      />
      <Button type={'primary'} onClick={(e) => stopPropagation(e, confirmAdd)}>
        √
      </Button>
      <Button
        type={'primary'}
        danger
        onClick={(e) => stopPropagation(e, cancelAdd)}
      >
        x
      </Button>
    </div>
  )
}
