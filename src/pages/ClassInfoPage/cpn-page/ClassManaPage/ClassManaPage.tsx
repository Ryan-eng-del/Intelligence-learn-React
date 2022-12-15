import React from 'react'
import { ClassManaMain } from './ClassManaPageMain'
import { useToGetClassList } from 'server/fetchClass'
import { useCurrentClassInfo } from 'context/ClassInfoContext'

const ClassMana = () => {
  const { classInfo } = useCurrentClassInfo()
  const { data, isLoading } = useToGetClassList(classInfo.courseId)
  return <ClassManaMain classList={data!} isLoading={isLoading} />
}

export default ClassMana
