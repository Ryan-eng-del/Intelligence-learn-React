import React, { } from 'react'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ClassManaMain } from './ClassManaPageMain'
import { useToGetClassList } from 'server/fetchClass'
import { useCurrentClassInfo } from 'context/ClassInfoContext'

export const ClassMana = () => {
  const { classInfo } = useCurrentClassInfo()
  const { data, isLoading} = useToGetClassList(classInfo.courseId)
  return isLoading
  ? <BaseLoading />
  : <ClassManaMain classList={data!} />
}
