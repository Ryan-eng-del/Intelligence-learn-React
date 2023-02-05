import { ClockCircleOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import Countdown from 'antd/lib/statistic/Countdown'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { submitPaper } from 'server/fetchExam'
import { useShowQuestionForStudent } from 'server/fetchExam/TestPaper'
import { StudentPaperItem } from 'server/fetchExam/types'
import styled from 'styled-components'

const LeftExamWrapper = styled.div`
  width: 300px;
  background-color: #e2e8f0;
  padding: 15px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 43px);
  .paperName {
    margin-bottom: 35px;
  }
`

const CenterExamWrapper = styled.div`
  flex: 1;
  background-color: #3b82f6;
  overflow: auto;
  height: calc(100vh - 43px);
  background-color: #fff;
`

const RightExamWrapper = styled.div`
  width: 280px;
  padding: 15px;
  .status-bar {
    display: flex;
    margin-bottom: 13px;
  }

  .already-answer {
    display: flex;
    align-items: center;
    margin-right: 30px;
    &::before {
      content: '';
      border-radius: 3px;
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: #0ea5e9;
      margin-right: 10px;
    }
  }

  .no-answer {
    display: flex;
    align-items: center;
    &::before {
      content: '';
      border-radius: 3px;
      display: inline-block;
      width: 20px;
      border: 1px solid #0284c7;
      height: 20px;
      background-color: #fff;
      margin-right: 10px;
    }
  }
`

const LayoutWrapper = styled.div`
  display: flex;
`

const CountDownWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  color: #000;
  padding: 8px 25px;
  border-radius: 10px;
  font-size: 25px;

  .count-num {
    padding-left: 10px;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: #fff;
  width: 100%;
  color: rgba(0, 0, 0, 0.7);
  padding: 8px 25px;
  border-radius: 10px;
  .info-item:not(div:last-of-type) {
    margin-bottom: 13px;
  }
`
const ExamWrapper = styled.div`
  position: relative;
  min-width: 1280px;
`

const HeaderWrapper = styled.div`
  height: 43px;
  background-color: #475569;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  .button-submit {
    height: 100%;
    width: 100px;
  }
`

const QuestionBlock = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0284c7;
  cursor: pointer;
  border: 1px solid #0284c7;
`

const QuestionTypeWrapperStatus = styled.div`
  padding: 10px;
`

const QuestionStatusHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
`
const PaperDoing: React.FC = () => {
  // 需要路由获取参数
  const { paperId } = useParams()
  const { data: PaperData, isLoading } = useShowQuestionForStudent(paperId!)
  const { mutate: submitExam } = submitPaper(paperId!)

  const [open, setOpen] = useState(true)

  const paperMap = useMemo(() => ['single', 'multiple', 'judge', 'fillBank', 'shortAnswer'], [])
  const paperNameMap = useMemo(() => ['单选题', '多选题', '判断题', '填空题', '简答题'], [])

  interface ExamPaper {
    single: StudentPaperItem[]
    multiple: StudentPaperItem[]
    fillBank: StudentPaperItem[]
    shortAnswer: StudentPaperItem[]
    judge: StudentPaperItem[]
  }

  const examQuestionData: ExamPaper = useMemo(() => {
    const init = {
      single: [],
      multiple: [],
      fillBank: [],
      shortAnswer: [],
      judge: []
    }
    if (!PaperData) return init
    return PaperData?.questionOfPaperVOS?.reduce<Record<keyof ExamPaper, StudentPaperItem[]>>((pre, now) => {
      pre[paperMap[now.questionType] as keyof ExamPaper] =
        pre[paperMap[now.questionType] as keyof ExamPaper].concat(now)
      return pre
    }, init)
  }, [PaperData])

  useEffect(() => {
    console.log(examQuestionData, 'data')
  }, [])

  const clickSubmit = () => {
    submitExam()
  }

  const useExamInfo = () => {
    const score = useMemo(() => {
      return PaperData?.questionOfPaperVOS?.reduce((p, c) => p + (c.questionScore ? c.questionScore : 0), 0)
    }, [PaperData?.questionOfPaperVOS.length])

    const [startTime, endTime] = useMemo(() => {
      return [PaperData?.startTime, PaperData?.endTime].map((_) => {
        console.log(_, _?.split('T'))
        return _?.split('T').join(' ')
      })
    }, [PaperData?.startTime, PaperData?.endTime])

    return { score, startTime, endTime }
  }

  const { score, startTime, endTime } = useExamInfo()

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK

  return (
    <ExamWrapper>
      <HeaderWrapper>
        <Button type="primary" className="button-submit" onClick={clickSubmit}>
          交卷
        </Button>
      </HeaderWrapper>
      <LayoutWrapper>
        <LeftExamWrapper>
          <Typography.Title level={4} className="paperName">
            {PaperData?.paperName}
          </Typography.Title>

          <CountDownWrapper>
            <ClockCircleOutlined />
            <span className="count-num">
              <Countdown title="Time remaining" value={deadline} format="HH:mm:ss" />
            </span>
          </CountDownWrapper>

          <InfoWrapper>
            <div className="info-item">姓名：{PaperData?.studentName}</div>
            <div className="info-item">数量：{PaperData?.questionOfPaperVOS?.length}</div>
            <div className="info-item">满分：{score}</div>
            <div className="info-item">开始时间：{startTime}</div>
            <div className="info-item">结束时间：{endTime}</div>
          </InfoWrapper>
        </LeftExamWrapper>
        <CenterExamWrapper>
          <div className="son">1</div>
        </CenterExamWrapper>
        <RightExamWrapper>
          <div className="status-bar">
            <div className="already-answer">已经作答</div>
            <div className="no-answer">未作答</div>
          </div>

          <div>
            {Object.keys(examQuestionData)?.map((k) => {
              return examQuestionData[k as keyof ExamPaper]?.map((exam, index) => {
                return (
                  <QuestionTypeWrapperStatus key={index}>
                    <QuestionStatusHeader>
                      <Typography.Title level={5}>
                        {paperNameMap[exam.questionType]}
                        <span style={{ padding: '0 3px' }}></span>
                        <span>
                          {`(${examQuestionData[k as keyof ExamPaper].reduce((pre, now) => {
                            return pre + (now.questionScore || 0)
                          }, 0)}分)`}
                        </span>
                      </Typography.Title>
                    </QuestionStatusHeader>
                    <div>
                      {examQuestionData[k as keyof ExamPaper]?.map((_, index) => {
                        return <QuestionBlock key={index}>{index + 1}</QuestionBlock>
                      })}
                    </div>
                  </QuestionTypeWrapperStatus>
                )
              })
            })}
          </div>
        </RightExamWrapper>
        {/* <Header
            style={{
              position: 'sticky',
              top: 0,
              backgroundColor: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
              zIndex: 100
            }}
          > */}
        {/* <Title
            paperName={data?.paperName || '试卷'}
            num={data?.questionOfPaperVOS?.length}
            time={Time}
            score={data?.questionOfPaperVOS?.reduce((p, c) => p + (c.questionScore ? c.questionScore : 0), 0)}
          /> */}
        {/* </Header> */}
        {/* <Layout> */}
        {/* <Sider
              style={{
                position: 'sticky',
                top: 59,
                backgroundColor: 'white',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                height: 600,
                width: 400
              }}
            >
              <Menu num={len(data!)} />
            </Sider> */}
        {/* <Content style={{ fontSize: 'large', backgroundColor: 'white' }}>
              <QuestionList Questionlist={data?.questionOfPaperVOS} />
            </Content> */}
        {/* </Layout> */}
      </LayoutWrapper>
    </ExamWrapper>
  )
}

export default PaperDoing
