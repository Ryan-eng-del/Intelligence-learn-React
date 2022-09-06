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
import { ChapterNodeType, ChapterNodeType_init, ChapterResourceType } from 'server/fetchChapter/types'
import { Key } from 'react'

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
  const {
    data,
    addChildChapterData,
    addChapterData,
    queryClient,
    isLoading,
    addChapterMutate
  } = useChapterServer(setExpandKeys, setCurNode)
  /*处理树节点一点击就触发*/
  const handleOnExpand = (id: Key[], info: any) => {
    if (!info.node.expanded) {
      const key = info.node.key
      setExpandKeys((pre) => pre.concat(key))
    } else {
      const key = info.node.key
      setExpandKeys((pre) => pre.filter((v) => v != key))
    }
  }
  /*删除资源*/
  const handleDeleteResource = (id: string) => {
    deleteResource(data, id, queryClient)
  }
  /*添加资源显示弹窗*/
  const handleClickAddResource = (id: string) => {
    setIsModalVisible(true)
    setCurAddId(id)
  }
  /*关联知识点*/
  const handleClickRelatePoints = (id: string) => {
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
    node.chapterId = Math.random() * 10000 + ''
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
    /*添加根节点网络请求*/
    try {
      /*网络请求*/
      // await addChapterMutate({ course_id: '1', name: '2', chapter_pid: '3' })
      console.log('未抛出异常')
      setFocusStatus(false)
      /*发送创建节点的请求*/
      setCurNode((pre: ChapterNodeType | ChapterResourceType) => (pre.name = curAddInputValue,{...pre}))
      setCurNode(ChapterNodeType_init)
      setAddInputValue('')
    } catch (err: unknown) {
      console.log('抛出异常')
      cancelAdd()
      console.log(err)
    }
  }
  /*取消添加*/
  const cancelAdd = () => {
    handleDeleteTreeNode(
      // 可能是 章节树节点 也有可能是 章节资源节点
      "chapterId" in curNode ? curNode.chapterId : curNode.id,
      "chapterId" in curNode ? 'chapterNode' : 'courTimes'
    ).then(() => {
      setCurNode(ChapterNodeType_init)
      setFocusStatus(false)
    })
  }
  /*删除节点*/
  const handleDeleteTreeNode = async (id: string, type: string) => {
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
    setCurRenameNode((pre: ChapterNodeType) => (pre.name = curAddInputValue,{...pre}))
    setCurRenameNode(ChapterNodeType_init)


    setAddInputValue('')
  }
  const cancelRename = () => {
    setCurRenameNode(ChapterNodeType_init)
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
    handleDeleteResource,
    setExpandKeys
  }
}
