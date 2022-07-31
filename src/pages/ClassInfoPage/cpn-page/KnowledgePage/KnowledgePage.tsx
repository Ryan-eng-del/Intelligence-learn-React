import React, { useReducer } from 'react'
import {
  KnowledgeListWrapper,
  KnowledgeHeaderWrapper
} from './KnowledgePageStyle'
import { Button, Tree } from 'antd'
import { KnowledgePageReducer, initialState } from './reducer'
import type { TreeProps } from 'antd/es/tree'
export const KnowledgePage: React.FC = () => {
  const [state, dispatch] = useReducer(KnowledgePageReducer, initialState)
  const { modalVisible, childNodeList } = state
  // ↓仅用于消除提交警告，如有跟新请删除
  console.log(dispatch, modalVisible)

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info)
  }

  return (
    <>
      <KnowledgeListWrapper>
        <KnowledgeHeaderWrapper>
          <Button type="primary" style={{ width: '180px' }}>
            +添加同级知识点
          </Button>
          <Button type="primary" style={{ width: '180px' }}>
            +添加子级知识点
          </Button>
          <Tree
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={childNodeList}
          />
        </KnowledgeHeaderWrapper>
      </KnowledgeListWrapper>
    </>
  )
}
