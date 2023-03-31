import { createContext, useContext, useState } from 'react'
import { useGetCourseInfoById } from '../../server/fetchCourse'

export interface IClassInfo {
  courseId: string
  courseName: string | null
  coursesCover: string | null
  courseDescribe: string | null
}

const IClassInit = {
  courseId: '',
  courseName: null,
  coursesCover: null,
  courseDescribe: null
}

interface IClassInfoContext {
  getCurCourseInfo: (params: string) => void
  classInfo: IClassInfo
  getCourse: () => IClassInfo
}

const ClassInfo = createContext<IClassInfoContext>({
  classInfo: IClassInit,
  getCurCourseInfo: (i) => i,
  getCourse: () => IClassInit
})

export const ClassInfoContext = (props: any) => {
  const [classInfo, setClassInfo] = useState<IClassInfo>(IClassInit)
  const { mutateAsync } = useGetCourseInfoById()
  const getCourse = () => {
    return JSON.parse(sessionStorage.getItem('Context_CourseInfo') || '{}')
  }
  const getCurCourseInfo = async (courseId: string) => {
    try {
      const data = await mutateAsync(courseId)
      sessionStorage.setItem('Context_CourseInfo', JSON.stringify(data))
      setClassInfo(data)
    } catch (e) {}
  }
  return <ClassInfo.Provider value={{ getCurCourseInfo, classInfo, getCourse }}>{props.children}</ClassInfo.Provider>
}

export const useCurrentClassInfo = () => {
  const data = useContext(ClassInfo)
  return data
}
