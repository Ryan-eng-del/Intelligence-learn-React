import { Tree } from 'antd'
import React from 'react'
export interface TreeSelected {
  curCheckId?: any
  handleRelateCheck: any
  relateKeys: any
  handleRelateExpand: any
  checkTreeData: any
}
export const TreeSelected: React.FC<TreeSelected> = ({
  checkTreeData,
  curCheckId,
  handleRelateCheck,
  handleRelateExpand,
  relateKeys
}) => {
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
