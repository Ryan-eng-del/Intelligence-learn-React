import { createContext, useContext, useState } from 'react'
import { StateSetter } from 'types'

interface IClassInfo {
  courseId: string
  courseName: string | null
  coursesCover: string | null
  courseDescribe: string
}

const IClassInit = {
  // 对应的初始化状态（消除NUll）
  courseId: '1594121057541861377',
  courseName: null,
  coursesCover: null,
  courseDescribe: 'string'
}

interface IClassInfoContext {
  dispatchClassInfo: StateSetter<IClassInfo>
  classInfo: IClassInfo
}

const ClassInfo = createContext<IClassInfoContext>({
  classInfo: IClassInit,
  dispatchClassInfo: (i) => i
})

export const ClassInfoContext = (props: any) => {
  const [classInfo, setClassInfo] = useState<IClassInfo>(IClassInit)
  return (
    <ClassInfo.Provider value={{ dispatchClassInfo: setClassInfo, classInfo }}>{props.children}</ClassInfo.Provider>
  )
}

export const useCurrentClassInfo = () => {
  const data = useContext(ClassInfo)

  return data
}
