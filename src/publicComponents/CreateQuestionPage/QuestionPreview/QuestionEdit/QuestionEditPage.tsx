import { CreateExamRoutePage } from 'components/CreateExamPage'
import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { useShowQuestionDetails } from 'server/fetchExam'
import { QuestionEditPageWrapper } from './QuestionEditPageStyle'

export const QuestionEditPage: React.FC = () => {

  const { questionId } = useParams<{ questionId: string }>()
  //请求对应的数据
  const { data } = useShowQuestionDetails(questionId)
  useEffect(() => {
    setCur({...data!,score:0,isStore:true})
  }, [data])

  const [cur,setCur] = useState<IQuestionType|undefined>({...data!,score:0,isStore:true})

  return (
    <QuestionEditPageWrapper>
      {cur && <CreateExamRoutePage
        curEdit={cur}
        curOrder={1}
        setCurEditQuestion={setCur}
        dispatchQuestionType={(v)=>console.warn("不知道什么用的函数",v)}
      ></CreateExamRoutePage>}
    </QuestionEditPageWrapper>
  )
}
