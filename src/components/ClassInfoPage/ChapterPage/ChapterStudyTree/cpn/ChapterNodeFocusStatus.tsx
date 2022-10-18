import React, { memo } from 'react'
import { Button, Input } from 'antd'
import { stopPropagation } from 'util/stopPropagation'
import { debounce } from 'util/debounece'
import { IChapterReducerAction } from '../../../../../reducer/ChaperStudyTree/type/type'

const ChapterNodeFocusStatus: React.FC<{
  dispatchChapter: React.Dispatch<IChapterReducerAction>
  confirmAdd: any
  cancelAdd: any
}> = ({ confirmAdd, cancelAdd, dispatchChapter }) => {
  const debounceChange = debounce(
    (e: any) => {
      dispatchChapter({ type: 'setCurInputValue', curInputValue: e.target.value })
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
      <Button type={'primary'} onClick={(e) => stopPropagation(e, confirmAdd)} style={{ marginRight: '15px' }}>
        √
      </Button>
      <Button type={'primary'} danger onClick={(e) => stopPropagation(e, cancelAdd)}>
        x
      </Button>
    </div>
  )
}
export default memo(ChapterNodeFocusStatus)
