import React from 'react'
import styled from 'styled-components'
import { EditToolWrapperContent } from '../../../ChapterPage/ChapterStudyTree/cpn/ChapterTreeContent'

export const KnowledgeTreeNode: React.FC<{
  nodeName: string
  nodeId: string
  handleDeleteTreeNode: any
  handleClickAddChildChapter: any
  handleReNameTreeNode: any
  prePoints: any
  afterPoints: any
  relatePoints: any
}> = ({
  nodeName,
  nodeId,
  handleDeleteTreeNode,
  handleClickAddChildChapter,
  handleReNameTreeNode,
  prePoints,
  afterPoints,
  relatePoints
}) => {
  return (
    <ChapterTreeDirectoryWrapper>
      <div style={{ display: 'flex', justifyContent: 'spaceBetween' }}>
        <span className={'tree-node-title'}>{nodeName}</span>
        <PointsWrapper>
          <PrePointsWrapper>
            {prePoints?.length ? '前序知识点:' : ''}
            {prePoints?.map((p: any) => {
              return <Points key={p.pointId}>{p.pointName}</Points>
            })}
          </PrePointsWrapper>
          <AfterPointsWrapper>
            {afterPoints?.length ? '后序知识点:' : ''}
            {afterPoints?.map((p: any) => {
              return <Points key={p.pointId}>{p.pointName}</Points>
            })}
          </AfterPointsWrapper>
        </PointsWrapper>

        <EditToolWrapper className={'edit-tool-wrapper'} onClick={(e) => e.stopPropagation()}>
          <span onClick={() => handleClickAddChildChapter(nodeId)}>添加子知识点</span>
          <span onClick={() => relatePoints('前序', nodeId)}>关联前序知识点</span>
          <span onClick={() => relatePoints('后序', nodeId)}>关联后序知识点</span>
          <span onClick={() => handleDeleteTreeNode(nodeId)}>删除</span>
          <span onClick={() => handleReNameTreeNode(nodeId)}>重命名</span>
        </EditToolWrapper>
      </div>
    </ChapterTreeDirectoryWrapper>
  )
}
const EditToolWrapper = styled(EditToolWrapperContent)``

const ChapterTreeDirectoryWrapper = styled.div`
  transition: 0.3s opacity var(--easing);

  &:hover .edit-tool-wrapper {
    opacity: 1;
  }

  .tree-node-title {
    margin-right: 30px;
  }
`

const PointsWrapper = styled.span`
  max-width: 600px;
  overflow: hidden;
`
const PrePointsWrapper = styled.span`
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 20px;
`
const AfterPointsWrapper = styled.span`
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Points = styled.span`
  background-color: rgb(231, 236, 243);
  margin-left: 12px;
  font-size: 13px;
`
