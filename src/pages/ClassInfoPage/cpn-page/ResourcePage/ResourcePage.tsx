import { List, Space } from 'antd'
import { ResourceDrawer } from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/cpn/ResourceDrawer'
import { useClassTimeDispatch } from 'context/ChapterStudyTree/ClassTimeDispatchContext'
import { useUploadResource } from 'hook/useChapterStudy/useUploadResource'
import { useCheckKnowledgeTreeUI } from 'hook/useKnowledge/useCheckKnowledgeTreeUI'
import { useKnowledgeControl } from 'hook/useKnowledge/useKnowledgeControl'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import Skeletons from 'publicComponents/Skeleton'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useShowResourceList } from 'server/fetchCourseResource'
import { isTeachAuth } from 'util/isAuthTeach'
import { PreviewDrawer } from './PreviewDrawer'
import { ResourceListItem } from './ResourceListItem'

const ResourcePage: React.FC = () => {
  const { data, isLoading } = useShowResourceList(useParams().id!)
  const { knowledgeControl } = useKnowledgeControl()
  const { checkTreeData } = useCheckKnowledgeTreeUI(knowledgeControl.data)
  const { dispatch } = useClassTimeDispatch()

  const {
    handleUpload,
    openResourceDrawer,
    relatePoints,
    handleRelateCheck,
    progress,
    statusText,
    isVideoStart,
    isOtherStart,
    otherProgress,
    onCloseResourceDrawer,
    onOpenResourceDrawer,
    Uploadprops,
    handleUpHomework
  } = useUploadResource({ dispatch })

  const [open, setOpen] = useState(false)
  const [URL, setURL] = useState('')
  const [flush, setFlush] = useState(true)
  const [openType, setOpenType] = useState('img')

  const openPreview = (type: number, url: string) => {
    const typeMapper = {
      40: 'img',
      41: 'img',
      10: 'video',
      20: 'pdf'
    }
    setOpen(true)
    setURL(url)
    setOpenType(typeMapper[type as unknown as keyof typeof typeMapper])
  }

  return (
    <>
      <GlobalHeader
        title="课程资源"
        tool={
          isTeachAuth() ? <PrimaryButton title="上传资源" handleClick={onOpenResourceDrawer}></PrimaryButton> : <></>
        }
      ></GlobalHeader>
      <GlobalRightLayout>
        {isLoading ? (
          <Skeletons size="large" />
        ) : (
          <>
            <List
              size="large"
              header={
                <Space className="flex">
                  <span>文件</span>
                  <span>创建时间</span>
                  <span> </span>
                </Space>
              }
              bordered
              dataSource={data}
              renderItem={(i) => (
                <List.Item>
                  <ResourceListItem
                    item={i}
                    rename={(name) => {
                      i.resourceName = name
                    }}
                    preview={() => openPreview(i.type, i.resourceLink)}
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </GlobalRightLayout>

      <ResourceDrawer
        flash={flush}
        setFlush={setFlush}
        close={onCloseResourceDrawer}
        open={openResourceDrawer} // 打开状态
        videoStatus={{
          isStart: isVideoStart,
          progress: progress,
          text: statusText
        }}
        otherStatus={{
          isStart: isOtherStart,
          progress: otherProgress,
          text: statusText
        }}
        handleRelateCheck={handleRelateCheck}
        handleUpload={handleUpload}
        handleRelateExpand={knowledgeControl.handleRelateExpand}
        checkTreeData={checkTreeData}
        relateKeys={knowledgeControl.relateKeys}
        relatePoints={relatePoints}
        // TODO: 这里应该控制上传到resource而不是classTime
        // FIXME: 更换这里的uploadprops
        Uploadprops={Uploadprops}
        classId={useParams().id!}
        handleUpHomework={handleUpHomework}
      />
      <PreviewDrawer open={open} close={() => setOpen(false)} showType={openType as any} url={URL} />
    </>
  )
}

export default ResourcePage
