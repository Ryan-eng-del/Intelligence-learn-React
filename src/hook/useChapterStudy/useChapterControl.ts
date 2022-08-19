import { useChapterClient } from './useChapterStudyClient'
import { useChapterServer } from './useChapterStudyServer'
import {
  addChildChapterNode,
  addChildContentNode,
  addResource,
  deleteResource,
  deleteTreeContent,
  deleteTreeNode,
  reNameTreeNode,
  updateChapterTreeQueryCache
} from '../../util/chapterStudyTree'

export const useChapterControl = () => {
  /*Client状态层*/
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
    count,
    isModalVisible,
    setIsModalVisible,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setUploadType,
    curAddId,
    setCurAddId
  } = useChapterClient()
  /*Server状态层*/
  const { data, addChildChapterData, addChapterData, queryClient, isLoading } =
    useChapterServer(setExpandKeys)
  /*处理树节点一点击就触发*/
  const handleOnExpand = (id: any, info: any) => {
    if (count.current % 2) {
      const key = info.node.key
      setExpandKeys((pre) => pre.filter((v) => v != key))
      count.current++
    } else {
      const key = info.node.key
      setExpandKeys((pre) => pre.concat(key))
      count.current--
    }
  }
  /*删除资源*/
  const handleDeleteResource = (id: any) => {
    deleteResource(data, id, queryClient)
  }
  /*添加资源显示弹窗*/
  const handleClickAddResource = (id: any) => {
    setIsModalVisible(true)
    setCurAddId(id)
  }
  /*关联知识点*/
  const handleClickRelatePoints = (id: any) => {
    console.log(id)
  }
  /*处理弹窗okay添加资源*/
  const handleModalOk = () => {
    const resource = { type: uploadType, name: resourceTitle, id: '' }
    /*网络请求拿到id*/
    resource.id = Math.random() * 1000 + ''
    addResource(data, curAddId, queryClient, resource)
    setIsModalVisible(false)
  }
  /*添加根章节*/
  const handleClickAddChapter = async () => {
    /*先出现交互inputNode*/
    const node: any = new Object({
      chapterId: '',
      name: '新建节点',
      chapterOrder: 1,
      courseId: '1547211420256386',
      courTimes: [],
      childChapters: []
    })
    /*这里node保持引用，之后可以修改根据引用来创建name*/
    await setFocusStatus(true)
    updateChapterTreeQueryCache(
      (queryTreeData: any) => queryTreeData.concat(node),
      queryClient
    )
    /*这里添加网络请求网络请求拿到id*/
    // await addChapterMutate()
    node.chapterId = addChapterData?.id || Math.random() * 10000 + ''
    setCurNode(node)
  }
  /*添加子目录*/
  const handleClickAddChildChapter = async (chapterId: any) => {
    setExpandKeys((prevState) => {
      if (prevState.includes(chapterId)) {
        return prevState
      } else {
        return prevState.concat(chapterId)
      }
    })
    setFocusStatus(true)
    /*先出现交互inputNode*/
    const node: any = new Object({
      chapterId: '',
      name: '新建节点',
      chapterOrder: 1,
      courseId: '1547211420256386',
      courTimes: [],
      childChapters: []
    })
    setCurNode(node)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    addChildChapterNode(data, chapterId, queryClient, node)
    // await addChildChapterMutate({ chapterId, node })
    node.chapterId = addChildChapterData?.id || String(Math.random())
    /*这里node保持引用，之后可以修改根据引用来创建name*/
    setCurNode(node)
  }
  /*添加课时*/
  const handleClickAddChildCourseTime = async (chapterId: any) => {
    setExpandKeys((prevState) => {
      if (prevState.includes(chapterId)) {
        return prevState
      } else {
        return prevState.concat(chapterId)
      }
    })
    /*先出现交互inputNode*/
    const node: any = new Object({
      id: '',
      name: '新建节点',
      courseId: '1547211420256386',
      resource: []
    })
    setCurNode(node)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFocusStatus(true)
    addChildContentNode(data, chapterId, queryClient, node)
    // await addChildChapterMutate({ chapterId, node })
    node.id = addChildChapterData?.id || Math.random() + ''
    /*这里node保持引用，之后可以修改根据引用来创建name*/
    setCurNode(node)
  }
  /*确认添加*/
  const confirmAdd = async () => {
    setFocusStatus(false)
    /*发送创建节点的请求*/
    setCurNode((pre: any) => (pre.name = curAddInputValue))
    setCurNode({})
    setAddInputValue('')
  }
  /*取消添加*/
  const cancelAdd = () => {
    handleDeleteTreeNode(
      curNode.chapterId ? curNode.chapterId : curNode.id,
      curNode.chapterId ? 'chapterNode' : 'courTimes'
    ).then(() => {
      setCurNode({})
      setFocusStatus(false)
    })
  }
  /*删除节点*/
  const handleDeleteTreeNode = async (id: any, type: string) => {
    switch (type) {
      case 'courTimes':
        deleteTreeContent(data, id, queryClient)
        break
      case 'chapterNode':
        deleteTreeNode(data, id, queryClient)
    }
  }
  /*确认重命名*/
  const confirmRename = () => {
    setCurRenameNode((pre: any) => (pre.name = curAddInputValue))
    setCurRenameNode({})
    setAddInputValue('')
  }
  const cancelRename = () => {
    setCurRenameNode({})
  }
  /*重命名节点*/
  const handleReNameTreeNode = (chapterId: any) => {
    reNameTreeNode(
      data,
      chapterId,
      setCurRenameNode,
      setFocusStatus,
      setExpandKeys,
      setAddInputValue
    )
  }
  return {
    confirmAdd,
    cancelAdd,
    cancelRename,
    handleReNameTreeNode,
    handleClickAddChapter,
    handleClickAddChildChapter,
    confirmRename,
    handleClickAddChildCourseTime,
    handleDeleteTreeNode,
    curNode,
    data,
    setAddInputValue,
    curRenameNode,
    focusStatus,
    isLoading,
    expandKeys,
    isModalVisible,
    setIsModalVisible,
    handleOnExpand,
    handleClickAddResource,
    handleClickRelatePoints,
    handleModalOk,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setUploadType,
    handleDeleteResource
  }
}
