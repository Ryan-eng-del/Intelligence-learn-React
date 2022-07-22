// export interface ChildNodeList {
//   id: string
//   title: string
//   children: Array<ChildNodeList>
// }
import type { DataNode } from 'antd/es/tree'
export interface KnowledgePageState {
  modalVisible: boolean
  childNodeList: Array<DataNode>
}

export type KnowledgePageAction = { type: 'addSiblingEl' } //添加同级元素
