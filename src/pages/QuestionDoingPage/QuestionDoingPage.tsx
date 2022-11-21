import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowQuestionForStu, useSubmitQuestion } from 'server/fetchExam'
import { QuestionType, StudentPaperItem } from 'server/fetchExam/types'
import { Take as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { Take as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { Take as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { Button, Modal } from 'antd'
import { QuestionDoingPageWrapper } from './QuestionDoingPageStyle'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'

export const QuestionDoingPage = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId?: string }>()
  const { data } = useShowQuestionForStu(questionId)
  const { mutate , isLoading, data:result } = useSubmitQuestion()
  type T = StudentPaperItem
  const [ans,setAns] = useState('')

  const submit = () => {
    mutate({
      questionId: data?.questionId || "0",
      questionAnswer: ans,
      questionExistType: "3",
      questionType:data?.questionType || '0'
    })
    setIsModalOpen(true)
  }
  const mapper = {
    [QuestionType.single]: (data: T) => <P1 content={data} setAns={setAns} />,
    [QuestionType.multiple]: (data: T) => <P2 content={data} setAns={setAns} />,
    [QuestionType.fillBlank]: (data: T) => (
      <P3 content={data} setAns={setAns} />
    ),
    [QuestionType.shortAnswer]: (data: T) => (
      <P4 content={data} setAns={setAns} />
    ),
    [QuestionType.judge]: (data: T) => <P5 content={data} setAns={setAns} />
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () =>setIsModalOpen(false)
  const handleCancel = () => setIsModalOpen(false)

  useEffect(()=>console.log(data),[data])
  return (
    <QuestionDoingPageWrapper>
      {data && mapper[data.questionType]?mapper[data.questionType](data) : <></>}
      <hr />
      <Button onClick={()=>navigate('/studentClassinfo/questionbank')}>返回</Button>
      <Button>换一题</Button>
      <Button type="primary" onClick={submit}>提交</Button>
      <Modal title="回答结果" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {isLoading ? <BaseLoading /> :<>
        <h1>{result ? "回答正确！" : "回答错误" }</h1>
          题目解析
          相关知识点。。
          推荐题目列表
        </>}
      </Modal>
    </QuestionDoingPageWrapper>
  )
}
