import React from 'react'
import { Button, Input } from 'antd'
import { stopPropagation } from 'util/stopPropagation'

export const ChapterNodeRenameStatus: React.FC<{
  setAddInputValue: any
  confirmRename: any
  cancelRename: any
  value: any
}> = ({ setAddInputValue, confirmRename, cancelRename, value }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Input
        autoFocus
        onChange={(e) => setAddInputValue(e.target.value)}
        style={{ marginRight: '12px' }}
        defaultValue={value}
        onClick={(e) => e.stopPropagation()}
      />
      <Button
        type={'primary'}
        onClick={(e) => stopPropagation(e, confirmRename)}
        style={{ marginRight: '15px' }}
      >
        √
      </Button>
      <Button
        type={'primary'}
        danger
        onClick={(e) => stopPropagation(e, cancelRename)}
      >
        x
      </Button>
    </div>
  )
}
