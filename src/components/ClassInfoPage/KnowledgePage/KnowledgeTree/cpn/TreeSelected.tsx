import { Tree } from 'antd'
import React from 'react'

export interface TreeSelected {
  curCheckId?: string[]
  handleRelateCheck: any
  relateKeys: string[]
  handleRelateExpand: any
  checkTreeData: any
}

export const TreeSelected = (props: TreeSelected) => {
  const { checkTreeData, curCheckId, handleRelateCheck, handleRelateExpand, relateKeys } = props
  return (
    <Tree
      checkStrictly={true}
      checkedKeys={curCheckId}
      checkable={true}
      onCheck={handleRelateCheck}
      expandedKeys={relateKeys}
      onExpand={handleRelateExpand}
      onSelect={handleRelateExpand}
    >
      {checkTreeData && checkTreeData}
    </Tree>
  )
}
