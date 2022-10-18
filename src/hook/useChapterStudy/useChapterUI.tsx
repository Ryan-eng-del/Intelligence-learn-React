import { Tree } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import React from 'react'
import ChapterNodeRenameStatus from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeRenameStatus'
import ChapterNodeFocusStatus from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeFocusStatus'
import ChapterTreeDirectory from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/cpn/ChapterTreeDirectory'
import ChapterTreeContent from '../../components/ClassInfoPage/ChapterPage/ChapterStudyTree/cpn/ChapterTreeContent'
import { ChapterNodeType, ChapterResourceType, CourTimeType } from 'server/fetchChapter/types'
import { useChapterControlRefactor } from './useChapterControlRefactor'

const { TreeNode } = Tree
export const useChapterUI = (type?: 'show') => {
  /*业务逻辑层*/
  const { chapterControl } = useChapterControlRefactor()

  /*表单focus状态UI*/
  const focusStateUI = (
    <ChapterNodeFocusStatus
      confirmAdd={chapterControl.confirmAddChapter}
      cancelAdd={chapterControl.cancelAddChapter}
      dispatchChapter={chapterControl.dispatchChapter}
    />
  )
  /*重命名状态的UI*/
  const renameStatusUI = (name: string) => {
    return (
      <ChapterNodeRenameStatus
        dispatchChapter={chapterControl.dispatchChapter}
        confirmRename={chapterControl.confirmRename}
        cancelRename={chapterControl.cancelRename}
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
        handleDeleteTreeNode={chapterControl.handleDeleteTreeNode}
        handleClickAddChildChapter={chapterControl.handleClickAddChildChapter}
        handleClickAddChildCourseTime={chapterControl.handleClickAddChildCourseTime}
        handleReNameTreeNode={chapterControl.handleReNameTreeNode}
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
            handleDeleteTreeContent={chapterControl.handleDeleteTreeContent}
            resource={resource}
            handleDeleteResource={chapterControl.handleDeleteResource}
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
  const generateTreeNode = (data: any[]) => {
    if (!data) return
    const recursion = (data: ChapterNodeType[] | CourTimeType[]) => {
      return data.map((d: any) => {
        if (d?.childChapters?.length || d?.courTimes?.length) {
          return (
            <TreeNode
              {...generateConfigObj(
                d.id,
                chapterControl.focusStatus && d == chapterControl.curRenameNode
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
          return d == chapterControl.curAddNode ? (
            <TreeNode
              {...generateConfigObj(
                d.classTimeId,
                chapterControl.focusStatus ? focusStateUI : generateTreeContentUI(d.classTimeId, d.name, d.resource)
              )}
            />
          ) : d == chapterControl.curRenameNode ? (
            <TreeNode
              {...generateConfigObj(
                d.classTimeId,
                chapterControl.focusStatus
                  ? renameStatusUI(d.name)
                  : generateTreeContentUI(d.classTimeId, d.name, d.resource)
              )}
            />
          ) : (
            generateTreeContentUI(d.classTimeId, d.name, d.resource)
          )
        }
        if (d == chapterControl.curAddNode)
          return (
            <TreeNode
              {...generateConfigObj(d.id, chapterControl.focusStatus ? focusStateUI : generateTreeNodeUI(d.id, d.name))}
            />
          )
        else if (d == chapterControl.curRenameNode)
          return <TreeNode {...generateConfigObj(d.id, renameStatusUI(d.name))} />
        else return <TreeNode {...generateConfigObj(d.id, generateTreeNodeUI(d.id, d.name))} />
      })
    }
    return recursion(data)
  }
  return {
    treeData: generateTreeNode(chapterControl.data ?? []),
    chapterControl
  }
}
