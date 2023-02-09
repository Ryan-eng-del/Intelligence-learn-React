import { ClockCircleOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import Countdown from 'antd/lib/statistic/Countdown'
import { Take as FillBlank } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as Judge } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { Take as MultipleChoice } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as ShortAnswer } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { Take as Single } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import React, { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { submitPaper } from 'server/fetchExam'
import { useShowQuestionForStudent } from 'server/fetchExam/TestPaper'
import { QuestionType, StudentPaperItem } from 'server/fetchExam/types'
import styled from 'styled-components'
import { useExamInfo } from './hook/useExamInfo'
import { ExamPaper, useExamQsData } from './hook/useExamQsData'
import { usePaperMap } from './hook/usePaperMap'

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
  const { paperId } = useParams()
  const { data: PaperData } = useShowQuestionForStudent(paperId!)
  const { mutate: submitExam } = submitPaper(paperId!)
  const { numberMap, paperNameMap } = usePaperMap()
  const examQuestionData = useExamQsData(PaperData)
  const { score, startTime, endTime } = useExamInfo(PaperData)

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK

  const clickSubmit = () => {
    submitExam()
  }

  const Mapper = {
    [QuestionType.single]: <T extends StudentPaperItem>(data: T, order: number) => (
      <Single content={data} order={order} />
    ),
    [QuestionType.multiple]: <T extends StudentPaperItem>(data: T, order: number) => (
      <MultipleChoice content={data} order={order} />
    ),
    [QuestionType.fillBlank]: <T extends StudentPaperItem>(data: T, order: number) => (
      <FillBlank content={data} order={order} />
    ),
    [QuestionType.shortAnswer]: <T extends StudentPaperItem>(data: T, order: number) => (
      <ShortAnswer content={data} order={order} />
    ),
    [QuestionType.judge]: <T extends StudentPaperItem>(data: T, order: number) => <Judge content={data} order={order} />
  }

  const QuestionCpn = ({ examMap, type }: { examMap?: typeof Mapper; type: 'nav' | 'content' }): ReactNode => {
    return (
      <>
        {Object.keys(examQuestionData)?.map((k) => {
          return examQuestionData[k as keyof ExamPaper]?.map((exam, index) => {
            return (
              <QuestionTypeWrapperStatus key={index}>
                <>
                  <QuestionStatusHeader>
                    <Typography.Title level={5}>
                      {numberMap[exam.questionType as keyof typeof numberMap]}
                      {paperNameMap[exam.questionType]}
                      <span style={{ padding: '0 3px' }}></span>
                      <span>
                        {`(${examQuestionData[k as keyof ExamPaper].reduce((pre, now) => {
                          return pre + (now.questionScore || 0)
                        }, 0)}分)`}
                      </span>
                    </Typography.Title>
                  </QuestionStatusHeader>
                  {examMap?.[exam.questionType]?.(exam, index + 1)}
                  {type === 'nav' && (
                    <div>
                      {examQuestionData[k as keyof ExamPaper]?.map((_, index) => {
                        return <QuestionBlock key={index}>{index + 1}</QuestionBlock>
                      })}
                    </div>
                  )}
                </>
              </QuestionTypeWrapperStatus>
            )
          })
        })}
      </>
    )
  }

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
        <CenterExamWrapper>{QuestionCpn({ type: 'content', examMap: Mapper })}</CenterExamWrapper>
        <RightExamWrapper>
          <div className="status-bar">
            <div className="already-answer">已经作答</div>
            <div className="no-answer">未作答</div>
          </div>

          {QuestionCpn({ type: 'nav' })}
        </RightExamWrapper>
      </LayoutWrapper>
    </ExamWrapper>
  )
}

export default PaperDoing
