import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const ChapterTreeDirectory: React.FC<{
  nodeName: string
  nodeId: string
  handleDeleteTreeNode: any
  handleClickAddChildChapter: any
  handleClickAddChildCourseTime: any
  handleReNameTreeNode: any
}> = ({
  nodeName,
  nodeId,
  handleDeleteTreeNode,
  handleClickAddChildChapter,
  handleClickAddChildCourseTime,
  handleReNameTreeNode
}) => {
  console.log('TreeDirectory')

  return (
    <ChapterTreeDirectoryWrapper style={{ display: 'flex' }}>
      <div>{nodeName}</div>
      <EditToolWrapper
        className={'edit-tool-wrapper'}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type={'primary'}
          onClick={() => handleClickAddChildChapter(nodeId)}
        >
          添加子目录
        </Button>
        <Button
          type={'primary'}
          onClick={() => handleClickAddChildCourseTime(nodeId)}
        >
          添加课时
        </Button>
        <Button
          type={'primary'}
          danger
          onClick={() => handleDeleteTreeNode(nodeId, 'chapterNode')}
        >
          删除
        </Button>
        <Button type={'primary'} onClick={() => handleReNameTreeNode(nodeId)}>
          重命名
        </Button>
      </EditToolWrapper>
    </ChapterTreeDirectoryWrapper>
  )
}
/*样式*/
const EditToolWrapper = styled.div`
  opacity: 0;
  transition: 0.3s opacity;
  position: absolute;
  right: 0;

  button {
    margin-right: 14px;
  }
`
const ChapterTreeDirectoryWrapper = styled.div`
  width: 950px;
  transition: 0.3s opacity var(--easing);

  &:hover .edit-tool-wrapper {
    opacity: 1;
  }
`
/*memo优化*/
export default React.memo(ChapterTreeDirectory)
