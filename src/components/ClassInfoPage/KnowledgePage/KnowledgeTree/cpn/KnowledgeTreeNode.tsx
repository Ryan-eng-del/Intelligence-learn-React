import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { stopPropagation } from 'util/stopPropagation'

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
      <div style={{ display: 'flex' }}>
        <div>{nodeName}</div>
        <EditToolWrapper className={'edit-tool-wrapper'}>
          <Button
            type={'primary'}
            onClick={(e) =>
              stopPropagation(e, () => handleClickAddChildChapter(nodeId))
            }
          >
            添加子知识点
          </Button>
          <Button
            type={'primary'}
            onClick={(e) =>
              stopPropagation(e, () => relatePoints('前序', nodeId))
            }
          >
            关联前序知识点
          </Button>
          <Button
            type={'primary'}
            onClick={(e) =>
              stopPropagation(e, () => relatePoints('后序', nodeId))
            }
          >
            关联后序知识点
          </Button>
          <Button
            type={'primary'}
            danger
            onClick={(e) =>
              stopPropagation(e, () => handleDeleteTreeNode(nodeId))
            }
          >
            删除
          </Button>
          <Button
            type={'primary'}
            onClick={(e) =>
              stopPropagation(e, () => handleReNameTreeNode(nodeId))
            }
          >
            重命名
          </Button>
        </EditToolWrapper>
      </div>
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
    </ChapterTreeDirectoryWrapper>
  )
}
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
const PointsWrapper = styled.div`
  margin-top: 15px;
`
const PrePointsWrapper = styled.div`
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const AfterPointsWrapper = styled.div`
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
