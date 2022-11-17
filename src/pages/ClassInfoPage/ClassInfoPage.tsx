
import { GlobalLayout } from 'publicComponents/GlobalLayout'
import { createContext } from 'react'
import { Outlet } from 'react-router-dom'
import { createClassNavMap } from 'util/createNavMap'
import ClassInfoNavItems from './config'

const curCourse = {
  courseId: '',
  courseName: '未知的课程',
  cover: '',
  Permission: false
}

const setCurCourse = (e: typeof curCourse) => {
  curCourse.courseId = e.courseId
  curCourse.courseName = e.courseName
  curCourse.cover = e.cover
  curCourse.Permission = e.Permission
}

const { Provider, Consumer: CurCourseProvider } = createContext({
  curCourse,
  setCurCourse
})

export const ClassInfoPage = () => {
  return (
    <GlobalLayout
      navItems={ClassInfoNavItems}
      routePage={<Outlet />}
      sliceCount={10}
      createMapFunction={createClassNavMap}
    />
  )
}
