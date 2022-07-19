import React from 'react'
import { ChapterPageWrapper } from './ChapterPageStyle'
import { ChapterTree } from 'publicComponents/ClassInfoPage'

export const ChapterPage: React.FC = () => {
  return (
    <>
      <ChapterPageWrapper>
        <ChapterTree />
      </ChapterPageWrapper>
    </>
  )
}
