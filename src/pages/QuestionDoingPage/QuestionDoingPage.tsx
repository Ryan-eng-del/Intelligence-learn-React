import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PrimaryButton } from 'publicComponents/Button'
import { useShowQuestionForStu, useSubmitQuestion } from 'server/fetchExam'
import { QuestionType, StudentPaperItem } from 'server/fetchExam/types'
import { Take as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { Take as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { Take as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { Button, Modal, Result } from 'antd'
import { QuestionDoingPageWrapper, BackButton } from './QuestionDoingPageStyle'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import Skeletons from '../../publicComponents/Skeleton/index'

const QuestionDoingPage = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId?: string }>()
  const { data } = useShowQuestionForStu(questionId)
  const { mutateAsync, isLoading } = useSubmitQuestion()
  type T = StudentPaperItem
  const [ans, setAns] = useState('')

  const submit = async () => {
    const result = await mutateAsync({
      questionId: questionId!,
      questionAnswer: ans,
      questionType: data?.questionType || '0'
    })
    setModal(result)
    setIsModalOpen(true)
  }

  // export type QuestionActionString = 'singleChoice' | 'multipleChoice' | 'fillBlankData' | 'judgeChoice' | 'shortAnswer'
  // export type QuestionConstantString = '0' | '1' | '2' | '3' | '4'

  const mapper = {
    [QuestionType.single]: (data: T) => <P1 content={data} setAns={setAns} NoScore />,
    [QuestionType.multiple]: (data: T) => <P2 content={data} setAns={setAns} NoScore />,
    [QuestionType.fillBlank]: (data: T) => <P3 content={data} setAns={setAns} NoScore />,
    [QuestionType.shortAnswer]: (data: T) => <P4 content={data} setAns={setAns} NoScore />,
    [QuestionType.judge]: (data: T) => <P5 content={data} setAns={setAns} NoScore />
  }

  const [modal, setModal] = useState<{
    answerIsRight: boolean
    nextQuestionId: string
    questionAnswerExplain: string
    resource: {
      resourceId: string
      resourceName: string
      type: number
      resourceLink: string
    }
  }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleCancel = () => setIsModalOpen(false)
  const { classInfo } = useCurrentClassInfo()
  return (
    <QuestionDoingPageWrapper>
      <BackButton>
        <button onClick={() => navigate(`/studentClassinfo/${classInfo.courseId}/questionbank`)}>
          <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
          <span>返回</span>
        </button  >
        {
          data?.questionType == '0' ? (<Tag color="processing" style={{height:'1.5rem'}}>单选题</Tag>) :
            data?.questionType == '1' ? (<Tag color="processing" style={{height:'1.5rem'}}>多选题</Tag>) :
              data?.questionType == '2' ? (<Tag color="processing" style={{height:'1.5rem'}}>填空题</Tag>) :
                data?.questionType == '3' ? (<Tag color="processing" style={{height:'1.5rem'}}>判断题</Tag>) :
                  data?.questionType == '4' ? (<Tag color="processing" style={{height:'1.5rem'}}>简答题</Tag>) : <></>
        }
      </BackButton>

      {/* <Button onClick={() => navigate(`/studentClassinfo/${classInfo.courseId}/questionbank`)}>返回</Button> */}
      {data && mapper[data.questionType] ? mapper[data.questionType](data) : <></>}
      <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button type="primary" onClick={submit} style={{ background: "linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%)", }}>
          提交
        </Button>
      </p>

      <Modal title="回答结果" visible={isModalOpen} onCancel={handleCancel} footer={[]}>
        {' '}
        {modal ? (
          <>
            <Result
              status={modal.answerIsRight ? 'success' : 'error'}
              title={modal.answerIsRight ? '回答正确' : '回答错误'}
              subTitle={modal.questionAnswerExplain}
              extra={[
                <Button
                  onClick={() => {
                    navigate(`/promote/${modal!.nextQuestionId}`), setIsModalOpen(false)
                  }}
                  key={1}
                >
                  下一题
                </Button>
              ]}
            />
          </>
        ) : (
          <Skeletons size="middle" />
        )}
        相关资源：
        {modal && <Button onClick={() => navigate(modal.resource.resourceLink)}>{modal.resource.resourceName}</Button>}
      </Modal>
    </QuestionDoingPageWrapper>
  )
}

export default QuestionDoingPage
