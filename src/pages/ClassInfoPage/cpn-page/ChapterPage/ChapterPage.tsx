import React from 'react'
import { ChapterPageWrapper } from './ChapterPageStyle'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
import {ChapterStudyTree} from "../../../../components/ClassInfoPage/ChapterPage/ChapterStudyTree/ChapterStudyTree";

export const ChapterPage: React.FC = () => {
  return (
    <>
      <ChapterPageWrapper>
        <CurCourseProvider>
          {({ curCourse }) => (
            <ChapterStudyTree  />
          )}
        </CurCourseProvider>
      </ChapterPageWrapper>
    </>
  )
}
