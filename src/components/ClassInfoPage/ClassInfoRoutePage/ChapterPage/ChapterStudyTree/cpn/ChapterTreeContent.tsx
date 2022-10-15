import React from 'react'
import { Button, Tag } from 'antd'
import { DeleteOutlined, FilePptOutlined, YoutubeOutlined } from '@ant-design/icons'
import { formatResource } from 'util/chapterStudyTree'
import styled from 'styled-components'
import { CustomLink } from '../../../../../../util/CustomLink'
import { ChapterResourceType } from '../../../../../../server/fetchChapter/types'

const ChapterTreeContent: React.FC<{
  contentName: string
  handleDeleteTreeContent: any
  contentId: string
  resource: ChapterResourceType[]
  handleDeleteResource: any
  type?: 'show'
}> = ({ type, contentName, handleDeleteTreeContent, contentId, resource, handleDeleteResource }) => {
  console.log('TreeContent')

  return (
    <>
      <ChapterTreeContentWrapper>
        <div style={{ display: 'flex' }}>
          <div>{contentName}</div>
          {!type && (
            <EditToolWrapperContent className={'edit-content-tool-wrapper'}>
              <Button type={'primary'}>编辑</Button>
              <Button type={'primary'} danger onClick={() => handleDeleteTreeContent(contentId, 'courTimes')}>
                删除
              </Button>
            </EditToolWrapperContent>
          )}
        </div>

        <ResourcePageWrapper>
          {formatResource(resource).map((item: ChapterResourceType) => {
            return (
              <ul key={item.resourceId}>
                <li className={'resource'} style={{ listStyle: 'none', position: 'relative' }}>
                  {item.type == '10' && (
                    <CustomLink to={'/teacher-preview/video/' + item.resourceId}>
                      <Tag color="#cd201f" icon={<YoutubeOutlined />}>
                        视频
                      </Tag>
                      <div style={{ display: 'inline-block' }}>{item.resourceName}</div>
                    </CustomLink>
                  )}
                  {item.type == '20' && (
                    <CustomLink to={'/teacher-preview/pdf/' + item.resourceId}>
                      <Tag color="#55acee" icon={<FilePptOutlined />}>
                        课件
                      </Tag>
                      <div style={{ display: 'inline-block' }}>{item.resourceName}</div>
                    </CustomLink>
                  )}

                  {!type && (
                    <DeleteIconWrapper>
                      <DeleteOutlined
                        onClick={() => handleDeleteResource(item.resourceId)}
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
