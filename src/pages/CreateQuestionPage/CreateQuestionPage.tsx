import { Button } from 'antd'
import { CreateExamMenu, CreateExamRoutePage } from 'components/CreateExamPage'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { createQuestionObj } from 'pages/CreateExamPage/util/util'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { QuestionConstantString } from 'server/fetchExam/types'
import { CreateQuestionWrapper } from './CreateQuestionPageStyle'

const CreateQuestionPage: React.FC = () => {
  const [curEdit, setCur] = useState<IQuestionType>()
  const { classInfo } = useCurrentClassInfo()
  const navigate = useNavigate()
  const AddQuestion = async (type: QuestionConstantString) => {
    const question = createQuestionObj(type, new Set(), classInfo.courseId)
    setCur(question)
  }
  return (
    <>
      <CreateQuestionWrapper>
        <GlobalHeader
          title="创建题目"
          tool={
            <>
              <CreateExamMenu addQuestionType={AddQuestion} />
              <Button onClick={() => navigate('../questionbank')}>返回</Button>
            </>
          }
        ></GlobalHeader>
        {curEdit && (
          <CreateExamRoutePage
            curEdit={curEdit}
            setCurEditQuestion={setCur}
            dispatchQuestionType={(v) => console.warn('不知道什么用的函数', v)}
          />
        )}
      </CreateQuestionWrapper>
    </>
  )
}

export default CreateQuestionPage
