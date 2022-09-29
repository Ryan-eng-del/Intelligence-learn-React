import { Button, Modal, Tree } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useKnowledgeUI } from 'hook/useKnowledge/useKnowledgeUI'
import { generateKnowledgeKeys } from 'util/knowledgeTree'
import { useMount } from 'hook/useMount'
import { useCheckKnowledgeTreeUI } from 'hook/useKnowledge/useCheckKnowledgeTreeUI'
import { BaseLoading } from '../../../../../baseUI/BaseLoding/BaseLoading'
import styled from 'styled-components'
import { TreeSelected } from './cpn/TreeSelected'
import { keys } from 'lodash'

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
      <KnowledgeHeaderButtonWrapper>
        <a
          className={'add-knowledge'}
          style={{ marginRight: '12px', marginBottom: '35px' }}
          onClick={addKnowledgePoint}
        >
          添加知识点
        </a>
        <Link to={'/k-graph'}>
          <a className={'k-graph'}>知识图谱</a>
        </Link>
      </KnowledgeHeaderButtonWrapper>
      <Modal
        title={curOrder}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TreeSelected
          curCheckId={curCheckId}
          checkTreeData={checkTreeData}
          handleRelateExpand={handleRelateExpand}
          handleRelateCheck={handleRelateCheck}
          relateKeys={relateKeys}
        />
      </Modal>

      {isLoading ? (
        <BaseLoading
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px'
          }}
        />
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
const KnowledgeHeaderButtonWrapper = styled.div`
  a.add-knowledge {
    display: inline-block;
    width: 120px;
    height: 36px;
    box-shadow: 0 3px 8px 0 rgb(58 107 255 / 33%);
    border-radius: 13px;
    text-align: center;
    color: white;
    font-size: 14px;
    line-height: 36px;
    background: linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%);

    &:hover {
      background: linear-gradient(140deg, #89d9ff 0%, #6c4aff 100%);
    }
  }

  a.k-graph {
    display: inline-block;
    padding: 0 16px;
    width: 120px;
    height: 36px;
    line-height: 36px;
    border: solid #94c1ff 1px;
    font-size: 14px;
    color: #3a8bff;
    font-weight: 500;
    border-radius: 20px;
    text-align: center;
    transition: 0.5s background-color ease;

    &:hover {
      background: #eaf0ff;
    }
  }
`
