import React, { createContext, useContext, useState } from 'react'
import { ClassInfoPageWrapper } from './ClassInfoPageStyle'

import { ClassInfoNav, ClassInfoRoutePage } from 'components/ClassInfoPage'
import { LayoutCpn } from 'publicComponents/LayoutCpn/LayoutCpn'

const curCourse = {
  classId: '',
  className: '未知的课程',
  cover: '',
  Permission: false
}

const setCurCourse = (e: typeof curCourse) => {
  curCourse.classId = e.classId
  curCourse.className = e.className
  curCourse.cover = e.cover
  curCourse.Permission = e.Permission
}

const { Provider, Consumer: CurCourseProvider } = createContext({
  curCourse,
  setCurCourse
})

export const ClassInfoPage = () => {
  return (
    <>
      <ClassInfoPageWrapper>
        <Provider value={{ curCourse, setCurCourse }}>
          <LayoutCpn
            layoutLeft={ClassInfoNav}
            layoutRight={ClassInfoRoutePage}
          />
        </Provider>
      </ClassInfoPageWrapper>
    </>
  )
}

export { CurCourseProvider }
