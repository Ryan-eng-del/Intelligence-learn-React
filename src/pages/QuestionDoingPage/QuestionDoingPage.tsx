import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Modal, Result, Space, Tag } from 'antd'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { usePaperMap } from 'pages/PaperDoingPage/hook/usePaperMap'
import { PrimaryButton } from 'publicComponents/Button'
import { Take as FillBlank } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as Judge } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { Take as MultipleChoice } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as ShortAnswer } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { DispatchQs, Take as Single } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { GlobalMessage } from 'publicComponents/GlobalMessage'
import Skeletons from 'publicComponents/Skeleton/index'
import { Unaccomplished } from 'publicComponents/Unaccomplished'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRandomQuestion, useShowQuestionForStu, useSubmitQuestion } from 'server/fetchExam'
import { QuestionOfPaperVO, QuestionType } from 'server/fetchExam/types'
import { BackButton, QuestionDoingPageWrapper } from './QuestionDoingPageStyle'
const QuestionDoingPage = () => {
  const navigate = useNavigate()
  const { questionId } = useParams()
  const { courseId } = useCurrentClassInfo().getCourse()
  const { data, isLoading: showLoading } =
    questionId !== '-1' ? useShowQuestionForStu(questionId) : useRandomQuestion(courseId)

  const { mutateAsync } = useSubmitQuestion()
  const [ans, setAns] = useState<any>(null)
  const submit = async () => {
    let answer =ans
    if(data!.questionType === QuestionType.judge){
      if(ans==='1'){
        answer=''
      }
    }
    const result = await mutateAsync({
      questionId: data!.questionId,
      questionAnswer: answer,
      questionType: data?.questionType || 0,
      courseId:courseId
    })
    setModal(result)
    setIsModalOpen(true)
  }

  const { paperNameMap } = usePaperMap()
  const dispatchQuestion: DispatchQs = (studentAnswer, qs) => {
      setAns(studentAnswer)
  }

  const Mapper = {
    [QuestionType.single]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <Single content={data} ans={ans} order={order} dispatch={dispatchQuestion} />
    ),
    [QuestionType.multiple]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <MultipleChoice content={data} ans={ans} order={order} dispatch={dispatchQuestion} />
    ),
    [QuestionType.fillBlank]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <FillBlank content={data} ans={ans} order={order} dispatch={dispatchQuestion} />
    ),
    [QuestionType.shortAnswer]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <ShortAnswer content={data} ans={ans} order={order} dispatch={dispatchQuestion} />
    ),
    [QuestionType.judge]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <Judge content={data} ans={ans} order={order} dispatch={dispatchQuestion} />
    )
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
  return (
    <>
      {showLoading ? (
        <Skeletons size="small" absolute />
      ) : (
        <QuestionDoingPageWrapper>
          <Unaccomplished>传入dispatch函数不对，功能不可用</Unaccomplished>
          <Space align="baseline">
            <Button shape="circle" onClick={() => navigate(`/classInfo/MyStudy/${courseId}/questionbank`)}>
              <ArrowLeftOutlined />
            </Button>
            <BackButton>
              {data && (
                <Tag color="processing" style={{ height: '1.5rem' }}>
                  {paperNameMap[data.questionType]}
                </Tag>
              )}
            </BackButton>
          </Space>

          {/* 题目正文 */}
          {data && Mapper[data.questionType](data, 0)}

          {
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PrimaryButton title="提交" handleClick={submit} />
            </p>
          }

          <Modal title="回答结果" open={isModalOpen} onCancel={handleCancel} footer={[]}>
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
                        navigate(`/promote/stu/${modal!.nextQuestionId}`), setIsModalOpen(false)
                      }}
                      key={1}
                    >
                      下一题
                    </Button>
                  ]}
                />
              </>
            ) : (
              <Skeletons size="small" absolute={true} />
            )}
            相关资源：
            {modal && (
              <Button onClick={() => navigate(modal.resource.resourceLink)}>{modal.resource.resourceName}</Button>
            )}
          </Modal>
        </QuestionDoingPageWrapper>
      )}
    </>
  )
}

export default QuestionDoingPage
