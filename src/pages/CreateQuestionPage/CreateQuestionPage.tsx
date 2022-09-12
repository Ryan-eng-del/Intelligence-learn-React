import React from 'react'
import {
  CreateQuestionHeader,
  CreateQuestionRoutePage
} from 'components/CreateQuestionPage'
import { CreateQuestionWrapper } from './CreateQuestionPageStyle'
export const CreateQuestionPage: React.FC = () => {
  return (
    <>
      <CreateQuestionWrapper>
        <CreateQuestionHeader></CreateQuestionHeader>
        <CreateQuestionRoutePage></CreateQuestionRoutePage>
      </CreateQuestionWrapper>
    </>
  )
}
