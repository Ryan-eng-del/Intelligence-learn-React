import React from 'react'
import { ChapterPageWrapper } from './ChapterPageStyle'
import { ChapterList } from 'publicComponents/ClassInfoPage'

export const ChapterPage: React.FC = () => {
  return (
    <>
      <ChapterPageWrapper>
        <ChapterList />
      </ChapterPageWrapper>
    </>
  )
}
