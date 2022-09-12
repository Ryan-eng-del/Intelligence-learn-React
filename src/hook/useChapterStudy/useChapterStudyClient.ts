import { useState } from 'react'
import { ChapterNodeType, ChapterNodeType_init, ChapterResourceType, CourTimeType } from 'server/fetchChapter/types'
import { KnowledgeNodeType } from 'server/fetchKnowledge/types'


export const useChapterClient = () => {
  const [expandKeys, setExpandKeys] = useState<string[]>([])
  const [curAddInputValue, setAddInputValue] = useState('')
  const [focusStatus, setFocusStatus] = useState(false)
  const [curRenameNode, setCurRenameNode] = useState<ChapterNodeType | CourTimeType>(ChapterNodeType_init)
  /** 用于 章节树节点 | 章节资源节点 | 知识树节点 */
  const [curNode, setCurNode] = useState<ChapterNodeType | CourTimeType >(ChapterNodeType_init)
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
