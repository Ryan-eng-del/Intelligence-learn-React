import { Modal } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useKnowledgeUI } from 'hook/useKnowledge/useKnowledgeUI'
import { generateKnowledgeKeys } from 'util/knowledgeTree'
import { useCheckKnowledgeTreeUI } from 'hook/useKnowledge/useCheckKnowledgeTreeUI'
import styled from 'styled-components'
import { TreeSelected } from './cpn/TreeSelected'
import { LoadingWrapper } from './cpn/LodingWrapper'

export const KnowledgeTree = () => {
  const { knowledgeControl, treeData } = useKnowledgeUI()
  const { checkTreeData } = useCheckKnowledgeTreeUI(knowledgeControl.data)

  useEffect(() => {
    knowledgeControl.dispatch({ type: 'setExpandKeys', expandKeys: () => generateKnowledgeKeys(knowledgeControl.data) })
  }, [knowledgeControl.data])
  return (
    <div>
      <KnowledgeHeaderButtonWrapper>
        <a
          className={'add-knowledge'}
          style={{ marginRight: '12px', marginBottom: '35px' }}
          onClick={knowledgeControl.addKnowledgePoint}
        >
          添加知识点
        </a>
        <Link to={'/k-graph'}>
          <a className={'k-graph'}>课程知识图谱</a>
        </Link>
        <Link to={'/mk-graph'}>
          <a className={'mk-graph'}>个人知识图谱</a>
        </Link>
      </KnowledgeHeaderButtonWrapper>
      <Modal
        title={knowledgeControl.curOrder}
        visible={knowledgeControl.isModalVisible}
        onOk={knowledgeControl.handleOk}
        onCancel={knowledgeControl.handleCancel}
      >
        <TreeSelected
          curCheckId={knowledgeControl.curCheckId}
          checkTreeData={checkTreeData}
          handleRelateExpand={knowledgeControl.handleRelateExpand}
          handleRelateCheck={knowledgeControl.handleRelateCheck}
          relateKeys={knowledgeControl.relateKeys}
        />
      </Modal>
      <LoadingWrapper
        isLoading={knowledgeControl.isLoading}
        treeData={treeData}
        handleExpand={knowledgeControl.handleExpand}
        handleSelect={knowledgeControl.handleExpand}
        expandKeys={knowledgeControl.knowledgeState.expandKeys}
      />
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

  a.k-graph,
  a.mk-graph {
    display: inline-block;
    padding: 0 16px;
    width: 130px;
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
  a.mk-graph {
    margin-left: 8px;
  }
`
