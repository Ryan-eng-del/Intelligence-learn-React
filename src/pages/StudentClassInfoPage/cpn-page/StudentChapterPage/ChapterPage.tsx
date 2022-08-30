import React from 'react'
import { ChapterPageWrapper } from './ChapterPageStyle'
import { ChapterList } from 'publicComponents/ClassInfoPage'

export const StudentChapterPage: React.FC = () => {
  return (
    <>
      <ChapterPageWrapper>
        <ChapterList />
      </ChapterPageWrapper>
    </>
  )
}
