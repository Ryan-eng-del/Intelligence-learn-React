import React from 'react'
import { Tree } from 'antd'
import { useKnowledgeControl } from './useKnowledgeControl'
import ChapterNodeFocusStatus from '../../components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeFocusStatus'
import { KnowledgeTreeNode } from '../../components/ClassInfoPage/ClassInfoRoutePage/KnowledgePage/KnowledgeTree/cpn/KnowledgeTreeNode'
import ChapterNodeRenameStatus from '../../components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeRenameStatus'

export const useKnowledgeUI = () => {
  /*业务逻辑层*/
  const {
    relateKeys,
    data,
    isLoading,
    setAddInputValue,
    confirmAdd,
    cancelAdd,
    addKnowledgePoint,
    curNode,
    focusStatus,
    addKnowledgeChildrenPoint,
    deleteKnowledgePoint,
    curRenameNode,
    renameKnowledgeNode,
    confirmRename,
    cancelRename,
    expandKeys,
    handleExpand,
    setExpandKeys,
    handleRelateCheck,
    handleCancel,
    handleOk,
    isModalVisible,
    curOrder,
    curCheckId,
    relatePoints,
    handleRelateExpand
  } = useKnowledgeControl()
  const generateKnowledgeNode = (
    pointId: any,
    pointName: any,
    prePoints: any,
    afterPoints: any
  ) => {
    return (
      <KnowledgeTreeNode
        nodeName={pointName}
        nodeId={pointId}
        handleDeleteTreeNode={(pointId: any) => deleteKnowledgePoint(pointId)}
        handleClickAddChildChapter={(pointId: any) =>
          addKnowledgeChildrenPoint(pointId)
        }
        relatePoints={relatePoints}
        prePoints={prePoints}
        afterPoints={afterPoints}
        handleReNameTreeNode={(pointId: any) => renameKnowledgeNode(pointId)}
      />
    )
  }

  /*根据后台数据来递归构造树节点*/
  const generateKnowledgeTree = (data: any) => {
    if (!data) return
    const recursion = (data: any) => {
      return data.map((d: any) => {
        if (d === curNode) {
          return (
            <Tree.TreeNode
              title={
                focusStatus ? (
                  <ChapterNodeFocusStatus
                    setAddInputValue={setAddInputValue}
                    confirmAdd={confirmAdd}
                    cancelAdd={cancelAdd}
                  />
                ) : (
                  generateKnowledgeNode(
                    d.pointId,
                    d.pointName,
                    d.prePoints,
                    d.afterPoints
                  )
                )
              }
              key={d.pointId}
            ></Tree.TreeNode>
          )
        }
        if (d === curRenameNode) {
          return (
            <Tree.TreeNode
              title={
                focusStatus ? (
                  <ChapterNodeRenameStatus
                    setAddInputValue={setAddInputValue}
                    confirmRename={confirmRename}
                    cancelRename={cancelRename}
                    value={curRenameNode.pointName}
                  />
                ) : (
                  generateKnowledgeNode(
                    d.pointId,
                    d.pointName,
                    d.prePoints,
                    d.afterPoints
                  )
                )
              }
              key={d.pointId}
            >
              {recursion(d.children)}
            </Tree.TreeNode>
          )
        }
        if (d?.children?.length) {
          return (
            <Tree.TreeNode
              title={generateKnowledgeNode(
                d.pointId,
                d.pointName,
                d.prePoints,
                d.afterPoints
              )}
              key={d.pointId}
            >
              {recursion(d.children)}
            </Tree.TreeNode>
          )
        }

        return (
          <Tree.TreeNode
            title={generateKnowledgeNode(
              d.pointId,
              d.pointName,
              d.prePoints,
              d.afterPoints
            )}
            key={d.pointId}
          ></Tree.TreeNode>
        )
      })
    }
    return recursion(data)
  }
  return {
    treeData: generateKnowledgeTree(data),
    isLoading,
    addKnowledgePoint,
    expandKeys,
    handleExpand,
    setExpandKeys,
    data,
    handleRelateCheck,
    handleCancel,
    handleOk,
    isModalVisible,
    curOrder,
    curCheckId,
    relateKeys,
    handleRelateExpand
  }
}
