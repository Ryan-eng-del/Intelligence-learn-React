import React from 'react'
import { useShowQuestionDetails } from 'server/fetchExam'
import {
  PreviewItemWrapperAnswer,
  PreviewItemWrapperKnowledge,
  PreviewItemWrapperOption,
  PreviewItemWrapperExplain,
  PreviewItemWrapperQuestion,
  PreviewItemWrapperRate,
  QuestionPreviewWrapper
} from './QuestionPreviewStyle'
export const QuestionPreview: React.FC = () => {
  const { data, isLoading } = useShowQuestionDetails()

  return (
    <>
      <QuestionPreviewWrapper>
        <PreviewItemWrapperQuestion>
          题目：
          {data?.questionDescription}
        </PreviewItemWrapperQuestion>

        <br />
        <PreviewItemWrapperOption>
          选项：{data?.questionAnswer}
        </PreviewItemWrapperOption>

        <br />
        <PreviewItemWrapperAnswer>
          答案：
          {data?.rightAnswer}
        </PreviewItemWrapperAnswer>

        <br />
        <PreviewItemWrapperExplain>
          解析：
          {data?.questionAnswerDescription}
        </PreviewItemWrapperExplain>

        <br />
        <PreviewItemWrapperRate>
          难易度：
          {data?.questionDifficulty}
        </PreviewItemWrapperRate>

        <br />
        <PreviewItemWrapperKnowledge>知识点：</PreviewItemWrapperKnowledge>
      </QuestionPreviewWrapper>
    </>
  )
}
