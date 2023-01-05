import React, { Suspense } from 'react'
import { ChapterStudyTree } from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/ChapterStudyTree'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { PrimaryButton } from 'publicComponents/Button'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout'
import { isTeachAuth } from 'util/isAuthTeach'
import { Outlet } from 'react-router-dom'
import Skeletons from 'publicComponents/Skeleton/index'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { BaseSpin } from '../../../../baseUI/BaseSpin/BaseSpin'

const ChapterPage: React.FC = () => {
  const editable = isTeachAuth()
  const { treeData, chapterControl } = useChapterUI(editable)
  return (
    <>
      <GlobalHeader
        title="课程章节学习"
        tool={
          editable && (
            <PrimaryButton title="添加章节" handleClick={chapterControl.handleClickAddChapter}></PrimaryButton>
          )
        }
      ></GlobalHeader>

      <GlobalRightLayout>
        {chapterControl.isLoading ? (
          <Skeletons size="middle" />
        ) : (
          <ChapterStudyTree treeData={treeData} chapterControl={chapterControl} />
        )}
      </GlobalRightLayout>
      <Suspense fallback={<BaseSpin size={'large'} />}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default ChapterPage
