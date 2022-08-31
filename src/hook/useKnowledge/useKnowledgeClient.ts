import { useState } from 'react'
import { useChapterClient } from '../useChapterStudy/useChapterStudyClient'

export const useKnowledgeClient = () => {
  const {
    setExpandKeys,
    curAddInputValue,
    setAddInputValue,
    setFocusStatus,
    setCurRenameNode,
    curNode,
    setCurNode,
    curRenameNode,
    focusStatus,
    expandKeys,
    isModalVisible,
    setIsModalVisible,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setUploadType,
    curAddId,
    setCurAddId
  } = useChapterClient()
  const [curOrder, setCurOrder] = useState('')
  const [curId, setCurId] = useState('')
  const [curCheckId, setCurCheckId] = useState([])
  const [relateKeys, setRelateKeys] = useState([])
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
    curAddId,
    setCurAddId,
    curCheckId,
    setCurCheckId,
    relateKeys,
    setRelateKeys
  }
}
