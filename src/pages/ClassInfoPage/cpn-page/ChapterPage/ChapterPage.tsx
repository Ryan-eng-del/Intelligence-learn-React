import React from 'react'
import { ChapterPageWrapper } from './ChapterPageStyle'
import { ChapterStudyTree } from 'components/ClassInfoPage/ClassInfoRoutePage/ChapterPage/ChapterStudyTree/ChapterStudyTree'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'

export const ChapterPage: React.FC = () => {
  return (
    <>
      <ChapterPageWrapper>
        <CurCourseProvider>
          {({ curCourse }) => (
            <ChapterStudyTree editable={curCourse.Permission} />
          )}
        </CurCourseProvider>
      </ChapterPageWrapper>
    </>
  )
}
