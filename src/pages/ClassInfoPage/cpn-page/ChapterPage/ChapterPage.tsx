import React from 'react'
import { ChapterStudyTree } from '../../../../components/ClassInfoPage/ChapterPage/ChapterStudyTree/ChapterStudyTree'
import { GlobalHeader } from '../../../../publicComponents/GlobalHeader/index'
import { PrimaryButton } from 'publicComponents/Button'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout'
import { useLocation } from 'react-router-dom'

export const ChapterPage: React.FC = () => {
  const location = useLocation()
  const editable = location.pathname.slice(11, 18) === 'teacher' ? true : false
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
        <ChapterStudyTree treeData={treeData} chapterControl={chapterControl} />
      </GlobalRightLayout>
    </>
  )
}
