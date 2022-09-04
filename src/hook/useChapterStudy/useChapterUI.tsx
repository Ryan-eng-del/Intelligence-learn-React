import { Tree } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import React from 'react'
import { useChapterControl } from './useChapterControl'
import { ChapterNodeRenameStatus } from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeRenameStatus'
import { ChapterNodeFocusStatus } from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeFocusStatus'
import ChapterTreeDirectory from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterTreeDirectory'
import ChapterTreeContent from '../../components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterTreeContent'

export const useChapterUI = () => {
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
  const renameStatusUI = (name: any) => {
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
    return (
      <ChapterTreeDirectory
        nodeId={chapterId}
        nodeName={name}
        handleDeleteTreeNode={handleDeleteTreeNode}
        handleClickAddChildChapter={handleClickAddChildChapter}
        handleClickAddChildCourseTime={handleClickAddChildCourseTime}
        handleReNameTreeNode={handleReNameTreeNode}
      />
    )
  }
  /*课时节点UI*/
  const generateTreeContentUI = (id: any, name: any, resource: any) => {
    if (!resource) return
    return (
      <Tree.TreeNode
        switcherIcon={<EditOutlined />}
        icon={<EditOutlined />}
        key={id}
        title={
          <ChapterTreeContent
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
      ></Tree.TreeNode>
    )
  }

  /*根据后台数据来递归构造树节点*/
  const generateTreeNode = (data: any) => {
    if (!data) return
    const recursion = (data: any) => {
      return data.map((d: any) => {
        // eslint-disable-next-line no-prototype-builtins
        if (d.hasOwnProperty('resource')) {
          if (d == curNode) {
            return (
              <Tree.TreeNode
                key={d.id}
                title={
                  focusStatus
                    ? focusStateUI
                    : generateTreeContentUI(d.id, d.name, d.resource)
                }
              />
            )
          } else if (d == curRenameNode) {
            return (
              <Tree.TreeNode
                key={d.id}
                title={
                  focusStatus
                    ? renameStatusUI(d.name)
                    : generateTreeContentUI(d.id, d.name, d.resource)
                }
              />
            )
          } else {
            return generateTreeContentUI(d.id, d.name, d.resource)
          }
        }
        if (
          (d.childChapters && d.childChapters.length) ||
          (d.courTimes && d.courTimes.length)
        ) {
          if (d === curRenameNode)
            return (
              <Tree.TreeNode
                key={d.chapterId}
                title={
                  focusStatus
                    ? renameStatusUI(d.name)
                    : generateTreeContentUI(d.id, d.name, d.resource)
                }
              >
                {d.childChapters.length && recursion(d.childChapters)}
                {d.courTimes && d.courTimes.length && recursion(d.courTimes)}
              </Tree.TreeNode>
            )
          else {
            return (
              <Tree.TreeNode
                key={d.chapterId}
                title={generateTreeNodeUI(d.chapterId, d.name)}
              >
                {d.childChapters.length && recursion(d.childChapters)}
                {d.courTimes && d.courTimes.length && recursion(d.courTimes)}
              </Tree.TreeNode>
            )
          }
        }
        if (d == curNode) {
          return (
            <Tree.TreeNode
              key={d.chapterId}
              title={
                focusStatus
                  ? focusStateUI
                  : generateTreeNodeUI(d.chapterId, d.name)
              }
            ></Tree.TreeNode>
          )
        } else if (d == curRenameNode) {
          return <Tree.TreeNode key={d.id} title={renameStatusUI(d.name)} />
        } else
          return (
            <Tree.TreeNode
              key={d.chapterId}
              title={generateTreeNodeUI(d.chapterId, d.name)}
            />
          )
      })
    }
    return recursion(data)
  }
  return {
    treeData: generateTreeNode(data),
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
