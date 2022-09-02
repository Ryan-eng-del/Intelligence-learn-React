import React from 'react'
import { Button, Input } from 'antd'

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
      />
      <Button type={'primary'} onClick={confirmAdd}>
        √
      </Button>
      <Button type={'primary'} danger onClick={cancelAdd}>
        x
      </Button>
    </div>
  )
}
