import { Tree } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import Skeletons from 'publicComponents/Skeleton'
import React from 'react'
interface LoadingWrapperProps extends Omit<React.ComponentProps<typeof Tree>, 'expandKeys'> {
  isLoading: boolean
  treeData: any
  handleExpand: any
  handleSelect: any
  expandKeys: string[]
}

export const LoadingWrapper = (props: LoadingWrapperProps) => {
  return props.isLoading ? (
    <Skeletons size="large" />
  ) : (
    <Tree expandedKeys={props.expandKeys} onExpand={props.handleExpand} onSelect={props.handleExpand}>
      {props?.treeData}
    </Tree>
  )
}

// 加上受控之后 ，会特别特别卡顿
