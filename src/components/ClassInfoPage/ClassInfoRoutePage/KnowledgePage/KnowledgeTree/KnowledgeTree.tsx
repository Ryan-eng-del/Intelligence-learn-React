import { Button, Modal, Tree } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useKnowledgeUI } from 'hook/useKnowledge/useKnowledgeUI'
import { generateKnowledgeKeys } from 'util/knowledgeTree'
import { useMount } from 'hook/useMount'
import { useCheckKnowledgeTreeUI } from 'hook/useKnowledge/useCheckKnowledgeTreeUI'
import { BaseLoading } from '../../../../../baseUI/BaseLoding/BaseLoading'

export const KnowledgeTree = () => {
  const {
    isLoading,
    treeData,
    addKnowledgePoint,
    expandKeys,
    setExpandKeys,
    handleExpand,
    data,
    handleRelateCheck,
    handleCancel,
    handleOk,
    isModalVisible,
    curOrder,
    curCheckId,
    relateKeys,
    handleRelateExpand
  } = useKnowledgeUI()
  const { checkTreeData } = useCheckKnowledgeTreeUI(data)
  useMount(() => {
    setExpandKeys(generateKnowledgeKeys(data))
  })
  return (
    <div>
      <Button
        type={'primary'}
        style={{ marginRight: '12px', marginBottom: '35px' }}
        onClick={addKnowledgePoint}
      >
        添加知识点
      </Button>
      <Link to={'/k-graph'}>
        <Button type={'primary'}>知识图谱</Button>
      </Link>
      <Modal
        title={curOrder}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
      </Modal>

      {isLoading ? (
        <BaseLoading />
      ) : (
        <Tree
          expandedKeys={expandKeys}
          onExpand={handleExpand}
          onSelect={handleExpand}
        >
          {treeData && treeData}
        </Tree>
      )}
    </div>
  )
}
