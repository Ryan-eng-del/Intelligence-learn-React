import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowQuestionForStu, useSubmitQuestion } from 'server/fetchExam'
import { QuestionType, StudentPaperItem } from 'server/fetchExam/types'
import { Take as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { Take as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { Take as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { Button, Modal, Result } from 'antd'
import { QuestionDoingPageWrapper } from './QuestionDoingPageStyle'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { useCurrentClassInfo } from 'context/ClassInfoContext'

export const QuestionDoingPage = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId?: string }>()
  const { data } = useShowQuestionForStu(questionId)
  const { mutateAsync , isLoading } = useSubmitQuestion()
  type T = StudentPaperItem
  const [ans,setAns] = useState('')

  const submit = async () => {
    const result = await mutateAsync({
      questionId: questionId!,
      questionAnswer: ans,
      questionType:data?.questionType || '0'
    })
    setModal(result)
    setIsModalOpen(true)
  }
  const mapper = {
    [QuestionType.single]: (data: T) => <P1 content={data} setAns={setAns} NoScore />,
    [QuestionType.multiple]: (data: T) => <P2 content={data} setAns={setAns} NoScore/>,
    [QuestionType.fillBlank]: (data: T) => (
      <P3 content={data} setAns={setAns} NoScore/>
    ),
    [QuestionType.shortAnswer]: (data: T) => (
      <P4 content={data} setAns={setAns} NoScore/>
    ),
    [QuestionType.judge]: (data: T) => <P5 content={data} setAns={setAns} NoScore/>
  }
  const [modal,setModal] = useState<{
    answerIsRight:boolean
    nextQuestionId:string
    questionAnswerExplain:string
    resource:{
      resourceId:string
      resourceName:string
      type: number
      resourceLink:string
    }
  }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => setIsModalOpen(false)
  const { classInfo } = useCurrentClassInfo()
  useEffect(()=>console.log(data),[data])
  return (
    <QuestionDoingPageWrapper>
      {data && mapper[data.questionType]?mapper[data.questionType](data) : <></>}
      <hr />
      <Button onClick={()=>navigate(`/studentClassinfo/${classInfo.courseId}/questionbank`)}>返回</Button>
      <Button type="primary" onClick={submit}>提交</Button>
      <Modal
        title="回答结果"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      > {modal ? <>
        <Result
          status={modal.answerIsRight ? "success" :"error"}
          title={modal.answerIsRight ? "回答正确" :"回答错误"}
          subTitle={modal.questionAnswerExplain}
          extra={[
            <Button onClick={()=>{
              navigate(`/promote/${modal!.nextQuestionId}`),
              setIsModalOpen(false)
            }} key={1}>
              下一题
            </Button>
          ]}
        />
        </>: <BaseLoading/>}
      相关资源：{
        modal && <Button
          onClick={()=>navigate(modal.resource.resourceLink)}
        >{modal.resource.resourceName}</Button>
      }
      </Modal>
    </QuestionDoingPageWrapper>
  )
}
