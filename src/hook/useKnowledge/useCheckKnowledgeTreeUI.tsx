import React from 'react'
import { Tree } from 'antd'

export const useCheckKnowledgeTreeUI = (data: any) => {
  const generateKnowledgeTreeUI = (data: any) => {
    if (!data) return
    const recursion = (data: any) => {
      return data.map((d: any) => {
        if (d.children?.length) {
          return (
            <Tree.TreeNode title={d.pointName} key={d.pointId}>
              {recursion(d.children)}
            </Tree.TreeNode>
          )
        } else {
          return <Tree.TreeNode title={d.pointName} key={d.pointId} />
        }
      })
    }
    return recursion(data)
  }
  const checkTreeData = generateKnowledgeTreeUI(data)
  return {
    checkTreeData
  }
}
