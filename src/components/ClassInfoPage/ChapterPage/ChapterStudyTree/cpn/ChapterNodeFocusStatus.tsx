import React, { memo } from 'react'
import { Button, Input } from 'antd'
import { stopPropagation } from 'util/stopPropagation'
import { debounce } from 'util/debounece'
import { IChapterReducerAction } from '../../../../../reducer/ChaperStudyTree/type/type'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        autoFocus
        onChange={(e) => debounceChange(e)}
        style={{ marginRight: '12px' }}
        onClick={(e) => e.stopPropagation()}
      />

      <Button
        type={'primary'}
        onClick={(e) => stopPropagation(e, confirmAdd)}
        style={{ marginRight: '15px', width: '3rem' }}
        icon={<CheckOutlined />}
      />

      <Button
        type={'primary'}
        style={{ marginRight: '15px', width: '3rem' }}
        danger
        onClick={(e) => stopPropagation(e, cancelAdd)}
        icon={<CloseOutlined />}
      />
    </div>
  )
}
export default memo(ChapterNodeFocusStatus)
