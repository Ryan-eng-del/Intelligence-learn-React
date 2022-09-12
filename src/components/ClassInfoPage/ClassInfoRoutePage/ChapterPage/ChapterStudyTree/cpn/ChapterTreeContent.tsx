import React from 'react'
import { Button, Tag } from 'antd'
import {
  DeleteOutlined,
  FileDoneOutlined,
  FilePptOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
import { formatResource } from 'util/chapterStudyTree'
import styled from 'styled-components'
import { CustomLink } from '../../../../../../util/CustomLink'

const ChapterTreeContent: React.FC<{
  contentName: string
  handleDeleteTreeContent: any
  contentId: string
  handleReNameTreeNode: any
  resource: ChapterResourceType[]
  handleClickAddResource: any
  handleClickRelatePoints: any
  handleDeleteResource: any
  type?: 'show'
}> = ({
  type,
  contentName,
  handleDeleteTreeContent,
  contentId,
  handleReNameTreeNode,
  resource,
  handleClickAddResource,
  handleClickRelatePoints,
  handleDeleteResource
}) => {
  console.log('Content - 课时节点')
  return (
    <>
      <ChapterTreeContentWrapper>
        <div style={{ display: 'flex' }}>
          <div>{contentName}</div>
          {!type && (
            <EditToolWrapperContent className={'edit-content-tool-wrapper'}>
              <Button
                type={'primary'}
                onClick={() => handleClickAddResource(contentId)}
              >
                添加资源
              </Button>
              <Button
                type={'primary'}
                onClick={() => handleClickRelatePoints(contentId)}
              >
                关联知识点
              </Button>
              <Button
                type={'primary'}
                danger
                onClick={() => handleDeleteTreeContent(contentId, 'courTimes')}
              >
                删除
              </Button>
              <Button
                type={'primary'}
                onClick={() => handleReNameTreeNode(contentId)}
              >
                重命名
              </Button>
            </EditToolWrapperContent>
          )}
        </div>

        <ResourcePageWrapper>
          {formatResource(resource).map((item: ChapterResourceType) => {
            return (
              <ul key={item.id}>
                <li
                  className={'resource'}
                  style={{ listStyle: 'none', position: 'relative' }}
                >
                  <CustomLink to={'/teacher-preview/' + item.id}>
                    {' '}
                    {item.type === '视频' ? (
                      <Tag color="#cd201f" icon={<YoutubeOutlined />}>
                        视频
                      </Tag>
                    ) : item.type === '课件' ? (
                      <Tag color="#55acee" icon={<FilePptOutlined />}>
                        课件
                      </Tag>
                    ) : (
                      <Tag color="#3b5999" icon={<FileDoneOutlined />}>
                        作业
                      </Tag>
                    )}
                    <div style={{ display: 'inline-block' }}>{item.name}</div>
                  </CustomLink>
                  {!type && (
                    <DeleteIconWrapper>
                      <DeleteOutlined
                        onClick={() => handleDeleteResource(item.id)}
                        style={{
                          marginLeft: '20px',
                          color: 'red',
                          position: 'absolute',
                          right: '100px'
                        }}
                      />
                    </DeleteIconWrapper>
                  )}
                </li>
              </ul>
            )
          })}
        </ResourcePageWrapper>
      </ChapterTreeContentWrapper>
    </>
  )
}
/*样式*/
const EditToolWrapperContent = styled.div`
  opacity: 0;
  position: absolute;
  right: 0;
  transition: 0.3s opacity var(--easing);

  button {
    margin-right: 14px;
  }
`
const ChapterTreeContentWrapper = styled.div`
  width: 950px;

  &:hover .edit-content-tool-wrapper {
    opacity: 1;
  }
`
const ResourcePageWrapper = styled.div`
  margin-top: 25px;
`
const DeleteIconWrapper = styled.div`
  &:hover span.anticon {
    color: black;
  }
`
/*memo性能优化*/
export default React.memo(ChapterTreeContent)
