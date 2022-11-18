import React from 'react'
import { Button } from 'antd'
import { ExamList } from 'publicComponents/ExamPage'

export const TeacherExamPage: React.FC<{ classId: string }> = () => {
  return (
    <>
      <div className="page-title">考试作业</div>
      <Button type="primary">新建作业</Button>
      <ExamList courseId='11'></ExamList>
    </>
  )
}
