import { createContext, useContext, useState } from 'react'

interface IClassInfo {
  courseId: string
  courseName: string
  coursesCover: string | null
  courseDescribe: string
}

interface IClassInfoContext {
  dispatchClassInfo: any
  classInfo: IClassInfo | null
}

const ClassInfo = createContext<IClassInfoContext | null>(null)

export const ClassInfoContext = (props: any) => {
  const [classInfo, setClassInfo] = useState(null)

  return (
    <ClassInfo.Provider value={{ dispatchClassInfo: setClassInfo, classInfo }}>{props.children}</ClassInfo.Provider>
  )
}

export const useCurrentClassInfo = () => {
  const context = useContext(ClassInfo)
  if (context) {
    const { dispatchClassInfo, classInfo } = context
    return { dispatchClassInfo, classInfo }
  } else return null
}
