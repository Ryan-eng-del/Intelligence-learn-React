import React from 'react'
import {
  PageWrapper,
} from 'publicComponents/PageStyle/PageHeaderWapper'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
import { StudentExamPage } from "./studentExamPage/studentExamPage";
import { TeacherExamPage } from "./teacherExamPage/teacherExamPage";

export const ExamPage: React.FC = () => {
  return (
    <>
      <PageWrapper>
        <CurCourseProvider>
          {({ curCourse }) => <>
            {
              curCourse.Permission ? <TeacherExamPage classId={curCourse.classId}/> : <StudentExamPage classId={curCourse.classId} />
            }
          </>}
        </CurCourseProvider>
      </PageWrapper>
    </>
  )
}
