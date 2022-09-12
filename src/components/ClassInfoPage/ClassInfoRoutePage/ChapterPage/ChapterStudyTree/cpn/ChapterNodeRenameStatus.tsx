import React from 'react'
import { Button, Input } from 'antd'
import { stopPropagation } from 'util/stopPropagation'
import { debounce } from 'util/debounece'

export const ChapterNodeRenameStatus: React.FC<{
  setAddInputValue: any
  confirmRename: any
  cancelRename: any
  value: any
}> = ({ setAddInputValue, confirmRename, cancelRename, value }) => {
  // debounce用来阻止，多次type造成setUpdaterFunction连续调用，导致组件多次渲染更新
  const debounceChange = debounce(
    (e: any) => {
      setAddInputValue(e.target.value)
    },
    300,
    true
  )
  return (
    <div style={{ display: 'flex' }}>
      <Input
        autoFocus
        onChange={(e) => debounceChange(e)}
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
