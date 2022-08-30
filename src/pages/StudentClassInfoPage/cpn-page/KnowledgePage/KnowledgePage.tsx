// import React, { useReducer } from 'react'
// import {
//   KnowledgeListWrapper,
//   KnowledgeHeaderWrapper
// } from './KnowledgePageStyle'
// import { Button, Tree } from 'antd'
// import { KnowledgePageReducer, initialState } from './reducer'
// import type { TreeProps } from 'antd/es/tree'
// export const KnowledgePage: React.FC = () => {
//   const [state, dispatch] = useReducer(KnowledgePageReducer, initialState)
//   // const { modalVisible, childNodeList } = state
//   // ↓仅用于消除提交警告，如有跟新请删除
//   // console.log(dispatch, modalVisible)

//   const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
//     console.log('selected', selectedKeys, info)
//   }

//   const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
//     console.log('onCheck', checkedKeys, info)
//   }
//   return <></>
// }

import React from 'react'
import { KnowledgeListWrapper } from './KnowledgePageStyle'
import { KnowledgeTree } from 'publicComponents/ClassInfoPage'
export const StudentKnowledgePage: React.FC = () => {
  return (
    <>
      <KnowledgeListWrapper>
        <KnowledgeTree />
      </KnowledgeListWrapper>
    </>
  )
}
