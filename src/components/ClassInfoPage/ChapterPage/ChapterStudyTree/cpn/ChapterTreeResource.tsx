import { CustomLink } from '../../../../../util/CustomLink'
import { Tag } from 'antd'
import { DeleteOutlined, FileImageFilled, FilePptFilled, YoutubeFilled } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'

export const ChapterTreeResource = (props: { resource: any; editable: boolean }) => {
  const { resource } = props
  return (
    <ResourcePageWrapper>
      <ResourceWrapper key={resource.resourceId}>
        <li className={'resource'} style={{ listStyle: 'none', position: 'relative' }}>
          {resource.type === 10 && (
            <CustomLink to={'teacher-preview/video/' + resource.resourceId}>
              <Tag icon={<YoutubeFilled />}>视频</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}
          {(resource.type === 20 || resource.type === 21) && (
            <CustomLink to={'teacher-preview/ppt/' + resource.resourceId}>
              <Tag icon={<FilePptFilled />}>PPT</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}{' '}
          {resource.type === 24 && (
            <CustomLink to={'teacher-preview/pdf/' + resource.resourceId}>
              <Tag icon={<FilePptFilled />}>PDF</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}
          {resource.type === 22 && (
            <CustomLink to={'teacher-preview/markdown/' + resource.resourceId}>
              <Tag icon={<FilePptFilled />}>markDown</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}
          {resource.type === 23 && (
            <CustomLink to={'teacher-preview/txt/' + resource.resourceId}>
              <Tag icon={<FilePptFilled />}>txt</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}
          {(resource.type === 40 || resource.type === 41) && (
            <CustomLink to={'teacher-preview/img/' + resource.resourceId}>
              <Tag icon={<FileImageFilled />}>图片</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}
          {resource.type === 50 && (
            <CustomLink to={'teacher-preview/mp3/' + resource.resourceId}>
              <Tag icon={<FileImageFilled />}>音频</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}
        </li>
        {props.editable && (
          <DeleteIconWrapper className={'delete'}>
            <DeleteOutlined />
          </DeleteIconWrapper>
        )}
      </ResourceWrapper>
    </ResourcePageWrapper>
  )
}

const ResourceWrapper = styled.div`
  min-width: 400px;
  display: flex;

  &:hover .delete {
    opacity: 1;
  }
`
const SingleResource = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  line-height: 13px;
`
const ResourcePageWrapper = styled.div`
  margin-top: 4px;
`
const DeleteIconWrapper = styled.div`
  position: absolute;
  right: 0;
  opacity: 0;

  &:hover span.anticon {
    color: black;
  }
`
