import { useState } from 'react'
import {
  KnowledgeNodeType,
  KnowledgeNodeType_init
} from 'server/fetchKnowledge/types'
import { useChapterClient } from '../useChapterStudy/useChapterStudyClient'

export const useKnowledgeClient = () => {
  const {
    setExpandKeys,
    curAddInputValue,
    setAddInputValue,
    setFocusStatus,
    focusStatus,
    expandKeys,
    isModalVisible,
    setIsModalVisible,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setUploadType,
    curChapterId
  } = useChapterClient()
  const [curOrder, setCurOrder] = useState('')
  const [curId, setCurId] = useState('')
  const [curCheckId, setCurCheckId] = useState([])
  const [relateKeys, setRelateKeys] = useState([])
  const [curNode, setCurNode] = useState<KnowledgeNodeType>(
    KnowledgeNodeType_init
  )
  const [curRenameNode, setCurRenameNode] = useState<KnowledgeNodeType>(
    KnowledgeNodeType_init
  )
  return {
    curId,
    setCurId,
    curOrder,
    setCurOrder,
    expandKeys,
    setExpandKeys,
    curAddInputValue,
    setAddInputValue,
    focusStatus,
    setFocusStatus,
    curRenameNode,
    setCurRenameNode,
    curNode,
    setCurNode,
    isModalVisible,
    setIsModalVisible,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setUploadType,
    curChapterId,
    curCheckId,
    setCurCheckId,
    relateKeys,
    setRelateKeys
  }
}
