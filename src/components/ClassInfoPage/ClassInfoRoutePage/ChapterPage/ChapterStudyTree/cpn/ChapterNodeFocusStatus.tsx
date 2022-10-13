import React, { memo } from 'react'
import { Button, Input } from 'antd'
import { stopPropagation } from 'util/stopPropagation'
import { debounce } from 'util/debounece'

const ChapterNodeFocusStatus: React.FC<{
  setAddInputValue: any
  confirmAdd: any
  cancelAdd: any
}> = ({ setAddInputValue, confirmAdd, cancelAdd }) => {
  // debounce用来阻止，多次点击造成setUpdaterFunction，导致组件多次渲染
  console.log('addNode')

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
        onClick={(e) => e.stopPropagation()}
      />
      <Button
        type={'primary'}
        onClick={(e) => stopPropagation(e, confirmAdd)}
        style={{ marginRight: '15px' }}
      >
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
export default memo(ChapterNodeFocusStatus)
