import { Tree } from 'antd'
import React from 'react'
import Skeletons from '../../../../../publicComponents/Skeleton/index'
interface LoadingWrapperProps extends Omit<React.ComponentProps<typeof Tree>, 'expandKeys'> {
  isLoading: boolean
  treeData: any
  handleExpand: any
  handleSelect: any
  expandKeys: string[]
}
export const LoadingWrapper = (props: LoadingWrapperProps) => {
  return props.isLoading ? (
    <Skeletons size="middle" />
  ) : (
    <Tree expandedKeys={props.expandKeys} onExpand={props.handleExpand} onSelect={props.handleExpand}>
      {props?.treeData}
    </Tree>
  )
}
