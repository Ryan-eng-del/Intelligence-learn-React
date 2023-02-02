import { ResourceDrawer } from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/cpn/ResourceDrawer'
import { useClassTimeDispatch } from 'context/ChapterStudyTree/ClassTimeDispatchContext'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { useUploadResource } from 'hook/useChapterStudy/useUploadResource'
import { useCheckKnowledgeTreeUI } from 'hook/useKnowledge/useCheckKnowledgeTreeUI'
import { useKnowledgeControl } from 'hook/useKnowledge/useKnowledgeControl'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import Skeletons from 'publicComponents/Skeleton/index'
import React from 'react'
import { useShowResourceList } from 'server/fetchCourseResource'
import { ResourceList } from './ResourceList'

const ResourcePage: React.FC = () => {
  const { data, isLoading } = useShowResourceList(useCurrentClassInfo().classInfo.courseId)
  const { knowledgeControl } = useKnowledgeControl()
  const { checkTreeData } = useCheckKnowledgeTreeUI(knowledgeControl.data)
  // TODO
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
    Uploadprops
  } = useUploadResource({ dispatch })

  return (
    <>
      <GlobalHeader
        title="课程资源"
        tool={<PrimaryButton title="上传资源" handleClick={onOpenResourceDrawer}></PrimaryButton>}
      ></GlobalHeader>
      <GlobalRightLayout>
        {isLoading ? <Skeletons size="middle" /> : <ResourceList resourceItems={data!} />}
      </GlobalRightLayout>

      <ResourceDrawer
        open={openResourceDrawer} // 打开状态
        close={onCloseResourceDrawer} //控制关闭
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
      />
    </>
  )
}

export default ResourcePage
