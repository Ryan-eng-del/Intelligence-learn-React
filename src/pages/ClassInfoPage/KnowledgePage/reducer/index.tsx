import type {
  KnowledgePageAction,
  KnowledgePageState
  // ChildNodeList
} from '../type'
export const initialState: KnowledgePageState = {
  modalVisible: false,
  childNodeList: [
    {
      key: '1',
      title: 'node1',
      children: [
        {
          key: '2',
          title: 'node1',
          children: []
        },
        {
          key: '3',
          title: 'node1',
          children: []
        }
      ]
    }
  ]
}

export const KnowledgePageReducer = (
  state: KnowledgePageState,
  action: KnowledgePageAction
) => {
  switch (action.type) {
    case 'addSiblingEl':
      return { ...state }
  }
}
