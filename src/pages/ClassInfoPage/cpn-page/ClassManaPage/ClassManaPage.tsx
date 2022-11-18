import React, { } from 'react'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ClassManaMain } from './ClassManaPageMain'
import { useToGetClassList } from 'server/fetchClass'

export const ClassMana: React.FC<{ courseId: string }> = (props) => {
  const { data: classList, isLoading: useToGetClassListIsLoading, isSuccess: useToGetClassListIsSuccess, } = useToGetClassList(props.courseId, '')
  return (
    <>
      {useToGetClassListIsLoading
      ? <BaseLoading />
      : <ClassManaMain classList={classList!} />
      }
    </>)
}
