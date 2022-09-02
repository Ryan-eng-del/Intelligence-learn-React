import React from 'react'
import { Button, Input } from 'antd'

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
      />
      <Button type={'primary'} onClick={confirmRename}>
        √
      </Button>
      <Button type={'primary'} danger onClick={cancelRename}>
        x
      </Button>
    </div>
  )
}
