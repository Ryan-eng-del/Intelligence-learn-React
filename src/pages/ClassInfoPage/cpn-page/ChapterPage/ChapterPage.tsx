import React from 'react'
import { ChapterStudyTree } from '../../../../components/ClassInfoPage/ChapterPage/ChapterStudyTree/ChapterStudyTree'
import { GlobalHeader } from '../../../../publicComponents/GlobalHeader/index'
import { PrimaryButton } from 'publicComponents/Button'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout'

export const ChapterPage: React.FC = () => {
  const { treeData, chapterControl } = useChapterUI(true)

  return (
    <>
      <GlobalHeader
        title="课程章节学习"
        tool={<PrimaryButton title="添加章节" handleClick={chapterControl.handleClickAddChapter}></PrimaryButton>}
      ></GlobalHeader>
      <GlobalRightLayout>
        <ChapterStudyTree treeData={treeData} chapterControl={chapterControl} />
      </GlobalRightLayout>
    </>
  )
}
