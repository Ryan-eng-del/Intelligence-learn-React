import { Tree } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import React from 'react'
import { useChapterControl } from './useChapterControl'
import ChapterNodeRenameStatus from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeRenameStatus'
import ChapterNodeFocusStatus from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeFocusStatus'
import ChapterTreeDirectory from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterTreeDirectory'
import ChapterTreeContent from '../../components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterTreeContent'
import {
  ChapterNodeType,
  ChapterResourceType,
  CourTimeType
} from 'server/fetchChapter/types'

const { TreeNode } = Tree
export const useChapterUI = (type?: 'show') => {
  /*业务逻辑层*/
  const {
    confirmAdd,
    cancelAdd,
    cancelRename,
    handleReNameTreeNode,
    handleClickAddChildChapter,
    confirmRename,
    handleClickAddChildCourseTime,
    handleDeleteTreeNode,
    setAddInputValue,
    handleClickAddChapter,
    data,
    isLoading,
    curNode,
    curRenameNode,
    focusStatus,
    expandKeys,
    handleOnExpand,
    handleClickRelatePoints,
    handleClickAddResource,
    isModalVisible,
    setIsModalVisible,
    handleModalOk,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setUploadType,
    handleDeleteResource,
    setExpandKeys
  } = useChapterControl()
  /*表单focus状态UI*/
  const focusStateUI = (
    <ChapterNodeFocusStatus
      setAddInputValue={setAddInputValue}
      confirmAdd={confirmAdd}
      cancelAdd={cancelAdd}
    />
  )
  /*重命名状态的UI*/
  const renameStatusUI = (name: string) => {
    return (
      <ChapterNodeRenameStatus
        setAddInputValue={setAddInputValue}
        confirmRename={confirmRename}
        cancelRename={cancelRename}
        value={name}
      />
    )
  }
  /*目录节点UI*/
  const generateTreeNodeUI = (chapterId: any, name: any) => {
    return !type ? (
      <ChapterTreeDirectory
        nodeId={chapterId}
        nodeName={name}
        handleDeleteTreeNode={handleDeleteTreeNode}
        handleClickAddChildChapter={handleClickAddChildChapter}
        handleClickAddChildCourseTime={handleClickAddChildCourseTime}
        handleReNameTreeNode={handleReNameTreeNode}
      />
    ) : (
      name
    )
  }
  /*课时节点UI*/
  const generateTreeContentUI = (
    id: string,
    name: string,
    resource: ChapterResourceType[]
  ) => {
    if (!resource) return
    return (
      <TreeNode
        switcherIcon={<EditOutlined />}
        icon={<EditOutlined />}
        key={id}
        title={
          <ChapterTreeContent
            type={type}
            contentId={id}
            contentName={name}
            handleDeleteTreeContent={handleDeleteTreeNode}
            handleReNameTreeNode={handleReNameTreeNode}
            resource={resource}
            handleClickAddResource={handleClickAddResource}
            handleClickRelatePoints={handleClickRelatePoints}
            handleDeleteResource={handleDeleteResource}
          />
        }
      ></TreeNode>
    )
  }
  const generateConfigObj = (key: any, title: any) => ({
    key,
    title
  })

  /*根据后台数据来递归构造树节点*/
  const generateTreeNode = (data: ChapterNodeType[]) => {
    if (!data) return
    const recursion = (data: ChapterNodeType[] | CourTimeType[]) => {
      return data.map((d: any) => {
        if (d?.childChapters?.length || d?.courTimes?.length) {
          return (
            <TreeNode
              {...generateConfigObj(
                d.id,
                focusStatus && d == curRenameNode
                  ? renameStatusUI(d.name)
                  : generateTreeNodeUI(d.id, d.name)
              )}
            >
              {recursion(d.childChapters)}
              {recursion(d.courTimes)}
            </TreeNode>
          )
        }
        if (d.resource) {
          return d == curNode ? (
            <TreeNode
              {...generateConfigObj(
                d.classTimeId,
                focusStatus
                  ? focusStateUI
                  : generateTreeContentUI(d.classTimeId, d.name, d.resource)
              )}
            />
          ) : d == curRenameNode ? (
            <TreeNode
              {...generateConfigObj(
                d.classTimeId,
                focusStatus
                  ? renameStatusUI(d.name)
                  : generateTreeContentUI(d.classTimeId, d.name, d.resource)
              )}
            />
          ) : (
            generateTreeContentUI(d.classTimeId, d.name, d.resource)
          )
        }
        if (d == curNode)
          return (
            <TreeNode
              {...generateConfigObj(
                d.id,
                focusStatus ? focusStateUI : generateTreeNodeUI(d.id, d.name)
              )}
            />
          )
        else if (d == curRenameNode)
          return (
            <TreeNode {...generateConfigObj(d.id, renameStatusUI(d.name))} />
          )
        else
          return (
            <TreeNode
              {...generateConfigObj(d.id, generateTreeNodeUI(d.id, d.name))}
            />
          )
      })
    }
    return recursion(data)
  }
  return {
    treeData: generateTreeNode(data!),
    isLoading,
    handleClickAddChapter,
    expandKeys,
    handleOnExpand,
    isModalVisible,
    setIsModalVisible,
    handleModalOk,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setUploadType,
    data,
    setExpandKeys
  }
}
