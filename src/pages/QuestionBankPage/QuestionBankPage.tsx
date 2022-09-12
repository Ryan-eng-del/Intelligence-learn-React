import React from 'react'
import {
  QuestionBankHeader,
  QuestionBankTable
} from 'components/QuestionBankPage'
import { QuestionBankPageWrapper } from './QuestionBankPageStyle'
export const QuestionBankPage: React.FC = () => {
  return (
    <>
      <QuestionBankPageWrapper>
        <QuestionBankHeader></QuestionBankHeader>
        <QuestionBankTable></QuestionBankTable>
      </QuestionBankPageWrapper>
    </>
  )
}
