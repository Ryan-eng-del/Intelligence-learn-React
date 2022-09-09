import React from 'react'
import { Tree } from 'antd'
import { KnowledgeNodeType } from 'server/fetchKnowledge/types'

export const useCheckKnowledgeTreeUI = (data: KnowledgeNodeType[]) => {
  const generateKnowledgeTreeUI = (data: KnowledgeNodeType[]) => {
    if (!data) return
    const recursion = (data: KnowledgeNodeType[]) => {
      return data.map((d) => {
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
