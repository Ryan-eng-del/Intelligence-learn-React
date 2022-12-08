import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { PrimaryButton } from 'publicComponents/Button/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/index'
import { useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { ExamList } from './Teacher'
import { isTeachAuth } from 'util/isAuthTeach'
import { StudentExamPage } from './Student'

export const ExamPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <GlobalHeader
        title="考试作业"
        tool={isTeachAuth() ?? <PrimaryButton title="添加考试" handleClick={() => navigate('editpaper')}></PrimaryButton>}
      ></GlobalHeader>
      <GlobalRightLayout>
        {isTeachAuth()
          ? <ExamList courseId={useParams().id!}></ExamList>
          : <StudentExamPage classId={useParams().id!}/>
        }
      </GlobalRightLayout>
      <Outlet />
    </>
  )
}
