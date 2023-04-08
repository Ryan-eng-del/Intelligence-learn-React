import { DeleteOutlined, FileImageFilled, FilePptFilled, YoutubeFilled } from '@ant-design/icons'
import { Badge, Tag } from 'antd'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { CustomLink } from 'util/CustomLink'
import { isTeachAuth } from 'util/isAuthTeach'

export const ChapterTreeResource = (props: { resource: any; editable: boolean }) => {
  const { resource } = props
  const location = useLocation()
  const Progress = (isStudy: any) => ['#ef3431', '#52c41a'][isStudy]
  const computedRoute = useMemo(() => {
    const pathname = location.pathname
    return pathname.slice(0, pathname.indexOf('chapter') + 7)
  }, [location])

  const TypeMap = useMemo(
    () => ({
      10: { icon: <YoutubeFilled />, linkTo: 'video', name: '视频' },
      20: { icon: <FilePptFilled />, linkTo: 'pdf', name: 'PPT' },
      24: { icon: <FilePptFilled />, linkTo: 'pdf', name: 'PDF' },
      22: { icon: <FilePptFilled />, linkTo: 'markdown', name: 'markdown' },
      23: { icon: <FilePptFilled />, linkTo: 'txt', name: 'txt' },
      40: { icon: <FileImageFilled />, linkTo: 'img', name: '图片' },
      41: { icon: <FileImageFilled />, linkTo: 'img', name: '图片' },
      50: { icon: <FileImageFilled />, linkTo: 'mp3', name: '音频' }
    }),
    []
  )
  const getMap = (type: any) =>
    TypeMap[type as keyof typeof TypeMap] ||
    (() => {
      console.error(type)
      return { icon: <YoutubeFilled />, linkTo: 'video', name: '未知' }
    })()
  const isStudent = !isTeachAuth()
  return (
    <ResourcePageWrapper>
      <ResourceWrapper key={resource.resourceId}>
        <div className={'resource'} style={{ position: 'relative', width: '100%' }}>
          {
            <CustomLink to={`${computedRoute}/teacher-preview/${getMap(resource.type).linkTo}/` + resource.resourceId}>
              {isStudent && <Badge count={' '} showZero style={{ backgroundColor: Progress(resource.isStudy) }} />}
              &nbsp;&nbsp;
              <Tag icon={getMap(resource.type).icon}>{getMap(resource.type).name}</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          }
          {/* 类型映射前 */}
          {/* {resource.type === 10 && (
            <CustomLink to={`${computedRoute}/teacher-preview/video/` + resource.resourceId}>
              <Badge status={Progress(resource.isStudy) as any} />
              <Tag icon={<YoutubeFilled />}>视频</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}

          {(resource.type === 20 || resource.type === 21) && (
            <CustomLink to={`${computedRoute}/teacher-preview/pdf/` + resource.resourceId}>
              <Badge status={Progress(resource.isStudy) as any} />
              <Tag icon={<FilePptFilled />}>PPT</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}

          {resource.type === 24 && (
            <CustomLink to={`${computedRoute}/teacher-preview/pdf/` + resource.resourceId}>
              <Badge status={Progress(resource.isStudy) as any} />
              <Tag icon={<FilePptFilled />}>PDF</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}

          {resource.type === 22 && (
            <CustomLink to={`${computedRoute}/teacher-preview/markdown/` + resource.resourceId}>
              <Badge status={Progress(resource.isStudy) as any} />
              <Tag icon={<FilePptFilled />}>markDown</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}

          {resource.type === 23 && (
            <CustomLink to={`${computedRoute}/teacher-preview/txt/` + resource.resourceId}>
              <Badge status={Progress(resource.isStudy) as any} />
              <Tag icon={<FilePptFilled />}>txt</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}

          {(resource.type === 40 || resource.type === 41) && (
            <CustomLink to={`${computedRoute}/teacher-preview/img/` + resource.resourceId}>
              <Badge status={Progress(resource.isStudy) as any} />
              <Tag icon={<FileImageFilled />}>图片</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )}

          {resource.type === 50 && (
            <CustomLink to={`${computedRoute}/teacher-preview/mp3/` + resource.resourceId}>
              <Badge status={Progress(resource.isStudy) as any} />
              <Tag icon={<FileImageFilled />}>音频</Tag>
              <SingleResource style={{ display: 'inline-block' }}>{resource.resourceName}</SingleResource>
            </CustomLink>
          )} */}
        </div>

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
  display: flex;
  width: 100%;

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
  width: 100%;
`
const DeleteIconWrapper = styled.div`
  position: absolute;
  right: 0;
  opacity: 0;

  &:hover span.anticon {
    color: black;
  }
`
