import { useState } from 'react'

export const useChapterClient = () => {
  const [expandKeys, setExpandKeys] = useState<string[]>([])
  const [curAddInputValue, setAddInputValue] = useState('')
  const [focusStatus, setFocusStatus] = useState(false)
  const [curRenameNode, setCurRenameNode] = useState<any>({})
  const [curNode, setCurNode] = useState<any>({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [resourceTitle, setResourceTitle] = useState()
  const [uploadType, setUploadType] = useState('视频')
  const [curAddId, setCurAddId] = useState('')
  return {
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
    setCurAddId
  }
}
