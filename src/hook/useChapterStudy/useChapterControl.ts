import { useChapterClient } from './useChapterStudyClient'
import { useChapterServer } from './useChapterStudyServer'
import {
  addChildChapterNode,
  addChildContentNode,
  deleteResource,
  deleteTreeContent,
  deleteTreeNode,
  reNameTreeNode,
  updateChapterTreeQueryCache
} from '../../util/chapterStudyTree'
import { useCallback } from 'react'
import { Key } from 'react'
import { ChildChapter } from 'types/server/fetchChapter'
import { cloneDeepWith } from 'lodash'
import { useMount } from '../useMount'

export const useChapterControl = () => {
  /*Client状态层*/
  const {
    curAddType,
    curAddInputValue,
    curRenameNode,
    focusStatus,
    expandKeys,
    isModalVisible,
    addContentNodeModal,
    resourceObj,
    resourceTitle,
    uploadType,
    curChapterId,
    curContentNode,
    curNode,
    setCurAddType,
    setExpandKeys,
    setAddInputValue,
    setFocusStatus,
    setCurRenameNode,
    setCurNode,
    setIsModalVisible,
    setResourceTitle,
    setUploadType,
    setCurChapterId,
    setAddContentNodeModal,
    setResourceObj,
    setCurContentNode,
    curFileListName,
    setCurFileListName,
    fileList,
    setFileList
  } = useChapterClient()
  /*Server状态层*/
  const {
    data,
    addChapterMutate,
    addChildChapterMutate,
    queryClient,
    isLoading,
    editChapterMutate,
    deleteChapterMutate,
    addContentMutate
  } = useChapterServer(setExpandKeys, setCurNode)

  /*处理树节点一点击就触发*/
  const handleOnExpand = useCallback((id: Key[], info: any) => {
    if (!info.node.expanded) {
      const key = info.node.key
      setExpandKeys((pre) => pre.concat(key))
    } else {
      const key = info.node.key
      setExpandKeys((pre) => pre.filter((v) => v != key))
    }
  }, [])
  /*删除资源*/
  const handleDeleteResource = useCallback(
    async (id: string) => {
      try {
        await deleteChapterMutate(id)
        deleteResource(data!, id, queryClient)
      } catch (err) {
        //! 等待封装错误处理
        console.log(err)
      }
    },
    [data]
  )
  /*添加资源显示弹窗*/
  const handleClickAddResource = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  /*关联知识点*/
  const handleClickRelatePoints = useCallback(
    (id: string) => {
      console.log(id)
    },
    [data]
  )

  /*添加根章节*/
  const handleClickAddChapter = useCallback(() => {
    /*先出现交互inputNode*/
    const node: ChildChapter = {
      id: Math.random() * 10000 + '',
      name: '新建节点',
      chapterOrder: 1,
      courTimes: [],
      childChapters: [],
      pid: ''
    }
    /*这里node保持引用，之后可以修改根据引用来创建name*/
    setCurNode(node)
    setFocusStatus(true)
    /*将curNode加入根章节，修改UI*/
    updateChapterTreeQueryCache(
      (queryTreeData: any) => queryTreeData.concat(node),
      queryClient
    )
  }, [data])

  /*添加子目录*/
  const handleClickAddChildChapter = useCallback(
    (chapterId: string) => {
      setExpandKeys((prevState) => {
        if (prevState.includes(chapterId)) {
          return prevState
        } else {
          return prevState.concat(chapterId)
        }
      })
      setFocusStatus(true)
      /*先出现交互inputNode*/
      const node: any = {
        id: Math.random() * 1000 + '',
        name: '新建节点',
        chapterOrder: 1,
        pid: '',
        courTimes: [],
        childChapters: []
      }
      setCurNode(node)
      addChildChapterNode(data, chapterId, queryClient, node)
    },
    [data]
  )

  /*添加课时*/
  const handleClickAddChildCourseTime = useCallback((chapterId: any) => {
    setIsModalVisible(true)
    /*先出现交互inputNode*/
    const node: any = {
      classTimeId: Math.random() * 10000 + '',
      name: '新建课时',
      resource: []
    }
    setCurChapterId(chapterId)
    setExpandKeys((prevState) => {
      if (!prevState.includes(chapterId))
        prevState = prevState.concat(chapterId)
      return prevState
    })
    setCurContentNode(node)
  }, [])

  const handleOk = useCallback(async () => {
    setIsModalVisible(false)

    try {
      await addContentMutate({
        chapter_id: curChapterId,
        name: resourceTitle,
        paper_id: '',
        paper_name: '',
        resource_ids: []
      })
      console.log(resourceObj, 'resourceObj')
      setCurContentNode((pre: any) => {
        pre.name = resourceTitle
        pre.resource = cloneDeepWith(resourceObj)
        return pre
      })
      /* 添加课时 */
      addChildContentNode(data!, curChapterId, queryClient, curContentNode)
    } catch (err) {
      //toDo 封装错误处理
    } finally {
      setResourceTitle('')
      setFileList([])
      setCurFileListName([])
      setResourceObj([])
    }
  }, [data, curChapterId, curContentNode, resourceObj, resourceTitle])

  /*确认添加*/
  const confirmAdd = async () => {
    const arg = {
      course_id: '',
      name: curAddInputValue,
      pid: curChapterId
    }
    setFocusStatus(false)
    setCurNode((pre: any) => {
      pre.name = curAddInputValue
      return pre
    })
    /*添加根节点网络请求*/
    try {
      /*网络请求*/
      if (curAddType == 'gen') await addChapterMutate(arg)
      else await addChildChapterMutate(arg)
      /*成功之后才会改节点的名字*/
    } catch (err: unknown) {
      console.log('抛出异常', err)
      /*删除节点*/
      deleteTreeNode(data!, curNode.id, queryClient)
      throw err
    } finally {
      setCurNode({})
      setAddInputValue('')
      setCurAddType('')
    }
  }
  /*取消添加*/
  const cancelAdd = () => {
    deleteTreeNode(data!, curNode.id, queryClient)
  }
  /*删除节点*/
  const handleDeleteTreeNode = useCallback(
    async (id: string, type: string) => {
      deleteTreeNode(data!, id, queryClient)
    },
    [data]
  )
  /*确认重命名*/
  const confirmRename = async () => {
    try {
      await editChapterMutate({
        chapter_id: curRenameNode.id,
        new_name: curAddInputValue
      })
      setCurRenameNode((pre: any) => {
        pre.name = curAddInputValue
        return pre
      })
    } catch (err) {
      console.log(err)
    } finally {
      setCurRenameNode({})
      setAddInputValue('')
    }
  }
  /* 取消重命名 */
  const cancelRename = () => {
    setCurRenameNode({})
    setFocusStatus(false)
  }
  /*重命名节点*/
  const handleReNameTreeNode = useCallback(
    (chapterId: any) => {
      reNameTreeNode(
        data!,
        chapterId,
        setCurRenameNode,
        setFocusStatus,
        setExpandKeys,
        setAddInputValue
      )
    },
    [data]
  )
  return {
    confirmAdd,
    cancelAdd,
    cancelRename,
    confirmRename,
    setAddInputValue,
    setIsModalVisible,
    setResourceTitle,
    setUploadType,
    setExpandKeys,
    setAddContentNodeModal,
    setResourceObj,
    setCurAddType,
    handleReNameTreeNode,
    handleClickAddChapter,
    handleClickAddChildChapter,
    handleClickAddChildCourseTime,
    handleDeleteTreeNode,
    curNode,
    data,
    curRenameNode,
    focusStatus,
    isLoading,
    expandKeys,
    isModalVisible,
    handleOnExpand,
    handleClickAddResource,
    handleClickRelatePoints,
    resourceTitle,
    uploadType,
    handleDeleteResource,
    addContentNodeModal,
    resourceObj,
    curAddType,
    curFileListName,
    setCurFileListName,
    fileList,
    setFileList,
    handleOk
  }
}
