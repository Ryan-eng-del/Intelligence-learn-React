import { Tree } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import React from 'react'
import { useChapterControl } from './useChapterControl'
import { ChapterNodeRenameStatus } from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeRenameStatus'
import { ChapterNodeFocusStatus } from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeFocusStatus'
import ChapterTreeDirectory from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterTreeDirectory'
import ChapterTreeContent from '../../components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/cpn/ChapterTreeContent'
import { ChapterNodeType, ChapterResourceType, CourTimeType } from 'server/fetchChapter/types'
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
  const generateTreeContentUI = (id: string, name: string, resource: ChapterResourceType[]) => {
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

  /*根据后台数据来递归构造树节点*/
  const generateTreeNode = (data: ChapterNodeType[]) => {
    if (!data) return
    const recursion = (data: ChapterNodeType[] | CourTimeType[]) => {
      return data.map((d: ChapterNodeType | CourTimeType) => {
        if ('resource' in d) {    // 断言为 CourTimeType
          if (d == curNode) {
            return (
              <TreeNode
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
              <TreeNode
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
        // CourTimeType 在上方必定return
            d;
        // 👆即使不断言也类型收窄到  CourTimeType
        if ('courTimes' in d) {   // 断言为 ChapterNodeType
          if (d === curRenameNode)
            return (
              <TreeNode key={d.chapterId} title={renameStatusUI(d.name)}>
                {recursion(d.childChapters)}
                {d.courTimes && recursion(d.courTimes)}
              </TreeNode>
            )
          else {
            return (
              <TreeNode
                key={d.chapterId}
                title={generateTreeNodeUI(d.chapterId, d.name)}
              >
                {d.childChapters.length && recursion(d.childChapters)}
                {d.courTimes && d.courTimes.length && recursion(d.courTimes)}
              </TreeNode>
            )
          }
        }
        // courTimes 是可选项， 运行到这里都是没有courTimes的ChapterNodeType
        if (d == curNode) {
          return (
            <TreeNode
              key={d.chapterId}
              title={
                focusStatus
                  ? focusStateUI
                  : generateTreeNodeUI(d.chapterId, d.name)
              }
            ></TreeNode>
          )
        } else if (d == curRenameNode) {
          return <TreeNode key={d.chapterId} title={renameStatusUI(d.name)} />
        } else return (
            <TreeNode
              key={d.chapterId}
              title={generateTreeNodeUI(d.chapterId, d.name)}
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
