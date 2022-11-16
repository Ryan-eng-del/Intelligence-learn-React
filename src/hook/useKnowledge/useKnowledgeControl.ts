import { useReducer } from 'react'
import { chapterReducer, initialChapterState } from '../../reducer/ChaperStudyTree/chapterReducer'
import { useAddKnowledgePoints } from './useHandleAddKnowledgePoint'
import { useRenameKnowledgePoints } from './useHandleRenameKnowledge'
import { useDeleteKnowledgePoints } from './useDeleteKnowledgePoints'
import { useHandleRelatePoints } from './useHandleRelatePoints'
import { useHandleOnExpand } from '../useChapterStudy/useHandleTreeOnExpand'
import { useShowKnowledgeTree } from '../../server/fetchKnowledge'

export const useKnowledgeControl = () => {
  const { data, isLoading } = useShowKnowledgeTree()
  const [knowledgeState, dispatch] = useReducer(chapterReducer, initialChapterState)
  /*添加知识点*/
  const { addKnowledgePoint, confirmAdd, curKnowledgeNode, cancelAdd, addKnowledgeChildrenPoint } =
    useAddKnowledgePoints({
      data: data ?? [],
      dispatchChapter: dispatch,
      chapterState: knowledgeState
    })
  /*删除知识点*/
  const { deleteKnowledgePoint } = useDeleteKnowledgePoints({ data, dispatchChapter: dispatch })

  /*重命名知识点*/
  const { confirmRename, cancelRename, curRenameNode, renameKnowledgeNode } = useRenameKnowledgePoints({
    data,
    dispatchChapter: dispatch,
    chapterState: knowledgeState
  })
  /*展开树节点*/
  const { handleOnExpand } = useHandleOnExpand(dispatch)
  /*关联知识点*/
  const {
    handleOk,
    handleCancel,
    relatePoints,
    handleRelateCheck,
    isTreeSelectModalVisible,
    relateKeys,
    curCheckId,
    showModal,
    curRelateType,
    handleRelateExpand
  } = useHandleRelatePoints({ data: data ?? [], dispatchChapter: dispatch })

  return {
    knowledgeControl: {
      handleRelateExpand,
      isModalVisible: isTreeSelectModalVisible,
      handleOk,
      handleCancel,
      data,
      isLoading,
      knowledgeState,
      dispatch,
      addKnowledgePoint,
      curNode: curKnowledgeNode,
      focusStatus: knowledgeState.focusState,
      confirmAdd,
      cancelAdd,
      addKnowledgeChildrenPoint,
      deleteKnowledgePoint,
      curRenameNode,
      renameKnowledgeNode,
      confirmRename,
      cancelRename,
      handleExpand: handleOnExpand,
      showModal,
      handleRelateCheck,
      relatePoints,
      curOrder: curRelateType,
      curCheckId: curCheckId,
      relateKeys
    }
  }
}
