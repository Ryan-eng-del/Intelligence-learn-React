import { useKnowledgeServer } from './useKnowledgeServer'
import {
  addChildKnowledgeNode,
  deleteKnowledgeNode,
  findCurRelatePoints,
  generateKnowledgeKeys,
  generateRelatePointsObj,
  relateAllPoints,
  renameKnowledgePoint,
  updateKnowledgeTreeQueryCache
} from '../../util/knowledgeTree'
import { useKnowledgeClient } from './useKnowledgeClient'
import { KnowledgeNodeType, KnowledgeNodeType_init } from 'server/fetchKnowledge/types'

export const useKnowledgeControl = () => {
  /*Client状态层*/
  const {
    relateKeys,
    setRelateKeys,
    curId,
    setCurId,
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
    curOrder,
    curCheckId,
    setCurCheckId,
    setCurOrder
  } = useKnowledgeClient()
  /*Server状态层*/
  const { data, queryClient, isLoading } = useKnowledgeServer(setExpandKeys)
  /*添加知识点*/
  const addKnowledgePoint = () => {
    const node: any = new Object({
      pointId: '',
      pointName: '新建节点',
      pointPid: '',
      children: []
    })
    /*这里node保持引用，之后可以修改根据引用来创建name*/
    setFocusStatus(true)
    updateKnowledgeTreeQueryCache(
      (queryTreeData: any) => queryTreeData.concat(node),
      queryClient
    )
    node.pointId = Math.random() * 10000 + ''
    setCurNode(node)
  }
  /*确认添加知识点*/
  const confirmAdd = () => {
    setCurNode((pre: KnowledgeNodeType) => (pre.pointName = curAddInputValue,{...pre}))
    setFocusStatus(false)
    /*发送创建节点的请求*/
    setCurNode(KnowledgeNodeType_init)
    setAddInputValue('')
  }
  /*取消删除节点*/
  const cancelAdd = () => {
    deleteKnowledgePoint(curNode.pointId)
    setCurNode(KnowledgeNodeType_init)
    setFocusStatus(false)
  }
  /*删除知识点*/
  const deleteKnowledgePoint = (id: any) => {
    deleteKnowledgeNode(data, id, queryClient)
  }
  /*添加子知识点*/
  const addKnowledgeChildrenPoint = (id: any) => {
    const node: any = new Object({
      pointId: '',
      pointName: '新建节点',
      pointPid: '',
      children: [],
      prePoints: [],
      afterPoints: []
    })
    /*这里node保持引用，之后可以修改根据引用来创建name*/
    setFocusStatus(true)
    node.pointId = Math.random() * 10000 + ''
    addChildKnowledgeNode(data, id, queryClient, node)
    setCurNode(node)
  }
  /*重命名节点*/
  const renameKnowledgeNode = (id: any) => {
    renameKnowledgePoint(
      data,
      id,
      setCurRenameNode,
      setFocusStatus,
      setExpandKeys,
      setAddInputValue
    )
  }
  /*确认重命名*/
  const confirmRename = () => {
    setFocusStatus(false)
    setCurRenameNode((pre: KnowledgeNodeType) => (pre.pointName = curAddInputValue,{...pre}))
    setCurRenameNode(KnowledgeNodeType_init)
    setAddInputValue('')
  }
  /*取消重命名*/
  const cancelRename = () => {
    setCurRenameNode(KnowledgeNodeType_init)
  }
  /*点击展开触发*/
  const handleExpand = (id: any, info: any) => {
    if (!info.node.expanded) {
      const key = info.node.key
      setExpandKeys((pre) => pre.concat(key))
    } else {
      const key = info.node.key
      setExpandKeys((pre) => pre.filter((v) => v != key))
    }
  }
  const handleRelateExpand = (id: any, info: any) => {
    if (!info.node.expanded) {
      const key = info.node.key
      setRelateKeys((pre) => pre.concat(key))
    } else {
      const key = info.node.key
      setRelateKeys((pre) => pre.filter((v) => v != key))
    }
  }
  /*选择树来触发*/
  const handleRelateCheck = (checkInfo: any) => {
    const { checked } = checkInfo
    setCurCheckId(checked)
  }
  /*处理关联知识点*/
  const showModal = () => {
    setIsModalVisible(true)
  }
  /*确认关联知识点*/
  const handleOk = () => {
    setIsModalVisible(false)
    const result: any = generateRelatePointsObj(data, curCheckId)
    relateAllPoints(
      data,
      curId,
      queryClient,
      result,
      curOrder === '前序' ? 'pre' : 'after'
    )
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const relatePoints = (mark: any, nodeId: any) => {
    setRelateKeys(generateKnowledgeKeys(data))
    const curId = findCurRelatePoints(data, nodeId, mark)
    setCurCheckId(curId)
    setCurOrder(mark)
    showModal()
    setCurId(nodeId)
  }
  return {
    handleRelateExpand,
    isModalVisible,
    handleOk,
    handleCancel,
    data,
    isLoading,
    addKnowledgePoint,
    curNode,
    focusStatus,
    setAddInputValue,
    confirmAdd,
    cancelAdd,
    addKnowledgeChildrenPoint,
    deleteKnowledgePoint,
    curRenameNode,
    renameKnowledgeNode,
    confirmRename,
    cancelRename,
    expandKeys,
    handleExpand,
    setExpandKeys,
    showModal,
    handleRelateCheck,
    relatePoints,
    curOrder,
    curCheckId,
    relateKeys
  }
}
