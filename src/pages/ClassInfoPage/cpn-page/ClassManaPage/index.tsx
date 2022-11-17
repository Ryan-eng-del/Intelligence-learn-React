// /* eslint-disable react/react-in-jsx-scope */
import { ClassMana } from "./ClassManaPage"
import React from "react"
import { CurCourseProvider } from "pages/ClassInfoPage/ClassInfoPage"

export const ClassManaPage: React.FC = () => {
  return (
    <>
      <CurCourseProvider>
        {
          ({ curCourse }) => (
            <ClassMana courseId={curCourse.courseId}/>
          )
        }
      </CurCourseProvider>
    </>
  )
}