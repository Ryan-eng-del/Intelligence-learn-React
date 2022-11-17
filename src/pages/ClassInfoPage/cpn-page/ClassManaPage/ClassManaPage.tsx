import React, { } from 'react'
import { useToGetClassList } from 'server/fetchClass'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ClassManaMain } from './ClassManaPageMain'

export const ClassMana: React.FC<{ courseId: string }> = (props) => {
  const { data: classList, isLoading: useToGetClassListIsLoading, isSuccess: useToGetClassListIsSuccess, } = useToGetClassList(props.courseId, '')
  return (
    <>
      {useToGetClassListIsLoading ?
        <BaseLoading

        />
        :
        <ClassManaMain classList={classList!} />
      }
    </>)
}
