import { Button, Modal, Result, Tag } from 'antd'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { Take as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { Take as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { Take as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowQuestionForStu, useSubmitQuestion } from 'server/fetchExam'
import { QuestionType, StudentPaperItem } from 'server/fetchExam/types'
import Skeletons from '../../publicComponents/Skeleton/index'
import { BackButton, QuestionDoingPageWrapper } from './QuestionDoingPageStyle'

const QuestionDoingPage = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId?: string }>()
  const { data, isLoading: showLoading } = useShowQuestionForStu(questionId)
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
  const { classInfo, getCurCourseInfo } = useCurrentClassInfo()

  const cId = classInfo.courseId
  console.log(cId, 'id')
  return (
    <>
      {showLoading ? (
        <Skeletons size="middle" absolute />
      ) : (
        <QuestionDoingPageWrapper>
          <BackButton>
            {data?.questionType == '0' ? (
              <Tag color="processing" style={{ height: '1.5rem' }}>
                单选题
              </Tag>
            ) : data?.questionType == '1' ? (
              <Tag color="processing" style={{ height: '1.5rem' }}>
                多选题
              </Tag>
            ) : data?.questionType == '2' ? (
              <Tag color="processing" style={{ height: '1.5rem' }}>
                填空题
              </Tag>
            ) : data?.questionType == '3' ? (
              <Tag color="processing" style={{ height: '1.5rem' }}>
                判断题
              </Tag>
            ) : data?.questionType == '4' ? (
              <Tag color="processing" style={{ height: '1.5rem' }}>
                简答题
              </Tag>
            ) : (
              <></>
            )}
          </BackButton>
          {data && mapper[data.questionType] ? mapper[data.questionType](data) : <></>}

          {/* {data && mapper[data.questionType] ? mapper[data.questionType](data) : <></>} */}
          {
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                type="primary"
                onClick={submit}
                style={{ background: 'linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%)' }}
              >
                提交
              </Button>
            </p>
          }

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
              <Skeletons size="middle" />
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
