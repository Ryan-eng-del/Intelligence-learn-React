import { useAddTestPaper } from 'server/fetchExam/TestPaper'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { PrimaryButton } from '../../../../publicComponents/Button/index'
import { GlobalRightLayout } from '../../../../publicComponents/GlobalLayout/index'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ExamList } from './Teacher'

export const ExamPage: React.FC = () => {
  const { mutate } = useAddTestPaper((id: string) => {
    navigate(`/editpaper/${id}`)
  })
  const navigate = useNavigate()
  return (
    <>
      <GlobalHeader
        title="考试作业"
        tool={<PrimaryButton title="添加考试" handleClick={() => navigate('editpaper')}></PrimaryButton>}
      ></GlobalHeader>
      <GlobalRightLayout>
        <ExamList courseId="213W"></ExamList>
      </GlobalRightLayout>
      <Outlet />
    </>
  )
}
