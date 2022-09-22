import React from 'react'
import { QuestionDetails } from 'server/fetchExam/types'
import {
  PreviewItemWrapperAnswer,
  PreviewItemWrapperKnowledge,
  PreviewItemWrapperOption,
  PreviewItemWrapperExplain,
  PreviewItemWrapperQuestion,
  PreviewItemWrapperRate,
  ShowDetailsWrapper
} from './ShowDetailsStyle'
export const ShowDetails: React.FC<{ data: QuestionDetails }> = ({ data }) => {
  return (
    <>
      <ShowDetailsWrapper>
        <PreviewItemWrapperQuestion>
          题目：
          {data?.questionDescription}
        </PreviewItemWrapperQuestion>

        <br />
        <PreviewItemWrapperOption>
          选项：{data?.questionOption}
        </PreviewItemWrapperOption>

        <br />
        <PreviewItemWrapperAnswer>
          答案：
          {data?.rightAnswer}
        </PreviewItemWrapperAnswer>

        <br />
        <PreviewItemWrapperExplain>
          解析：
          {data?.questionAnswerExplain}
        </PreviewItemWrapperExplain>

        <br />
        <PreviewItemWrapperRate>
          难易度：
          {data?.questionDifficulty}
        </PreviewItemWrapperRate>

        <br />
        <PreviewItemWrapperKnowledge>
          知识点：
          {data?.points}
        </PreviewItemWrapperKnowledge>
      </ShowDetailsWrapper>
    </>
  )
}
