import React, { } from 'react'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ClassManaMain } from './ClassManaPageMain'
import { useToGetClassList } from 'server/fetchClass'
import { useParams } from 'react-router-dom'

export const ClassMana = () => {
  const {courseId} = useParams();
  const { data: classList, isLoading: useToGetClassListIsLoading, isSuccess: useToGetClassListIsSuccess, } = useToGetClassList(courseId|| "")
  return (
    <>
      {useToGetClassListIsLoading
      ? <BaseLoading />
      : <ClassManaMain classList={classList!} />
      }
    </>)
}
