import React from 'react'
import styled from 'styled-components'
import { EditToolWrapperContent } from './ChapterTreeContent'

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
  return (
    <ChapterTreeDirectoryWrapper style={{ display: 'flex', position: 'relative' }}>
      <div>{nodeName}</div>
      <EditToolWrapper className={'edit-tool-wrapper'} onClick={(e) => e.stopPropagation()}>
        {/* <span onClick={() => handleClickAddChildChapter(nodeId)}>添加子目录</span> */}
        <span onClick={() => handleClickAddChildCourseTime(nodeId)}>添加课时</span>
        <span onClick={() => handleDeleteTreeNode(nodeId, 'chapterNode')}>删除</span>
        <span onClick={() => handleReNameTreeNode(nodeId)}>重命名</span>
      </EditToolWrapper>
    </ChapterTreeDirectoryWrapper>
  )
}
/*样式*/
const EditToolWrapper = styled(EditToolWrapperContent)`
  opacity: 0;
  transition: 0.3s opacity;
  position: absolute;
  right: 0;

  span {
    color: rgb(58, 139, 255);
    margin-left: 20px;
  }

  button {
    margin-right: 14px;
  }
`
const ChapterTreeDirectoryWrapper = styled.div`
  transition: 0.3s opacity var(--easing);

  &:hover .edit-tool-wrapper {
    color: var(--blue);
    opacity: 1;
  }
`
/*memo优化*/
export default React.memo(ChapterTreeDirectory)
