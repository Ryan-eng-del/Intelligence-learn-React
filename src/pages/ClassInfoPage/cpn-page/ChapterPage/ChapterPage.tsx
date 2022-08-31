import React from 'react'
import { ChapterPageWrapper } from './ChapterPageStyle'
import { ChapterStudyTree } from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/ChapterStudyTree'

export const ChapterPage: React.FC = () => {
  return (
    <>
      <ChapterPageWrapper>
        <ChapterStudyTree />
      </ChapterPageWrapper>
    </>
  )
}
