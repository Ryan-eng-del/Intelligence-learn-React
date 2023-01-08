import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Empty, Space } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { PrimaryButton } from 'publicComponents/Button'
import { Preview as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Preview'
import { Preview as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Preview'
import { Preview as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Preview'
import { Preview as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Preview'
import { Preview as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Preview'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowTestPaper } from 'server/fetchExam/TestPaper'
import { QuestionDataWithID, QuestionType, WholeQuestion } from 'server/fetchExam/types'
import { ItemWrapper, TestPaperPreviewWrapper, TitleWrapper } from './TestPaperPreviewStyle'

const TestPaperPreview: React.FC = () => {
  const { paperid } = useParams()
  const [dataList, setData] = useState<Array<WholeQuestion & { questionScore: number }>>([])
  const { data, isLoading } = useShowTestPaper(paperid!) // 打开试卷
  useEffect(() => {
    data && setData(data.questionOfPaperVos)
  }, [data])

  const navigate = useNavigate()
  type T = QuestionDataWithID
  const mapper = {
    [QuestionType.single]: (data: T, No: number) => <P1 content={data} No={No} />,
    [QuestionType.multiple]: (data: T, No: number) => <P2 content={data} No={No} />,
    [QuestionType.fillBlank]: (data: T, No: number) => <P3 content={data} No={No} />,
    [QuestionType.shortAnswer]: (data: T, No: number) => <P4 content={data} No={No} />,
    [QuestionType.judge]: (data: T, No: number) => <P5 content={data} No={No} />
  }
  return (
    <>
      <TestPaperPreviewWrapper>
        <TitleWrapper>
          {isLoading ? (
            <BaseLoading />
          ) : (
            <Space align="center" size={24}>
              <Button icon={<ArrowLeftOutlined />} shape="circle" size="large" onClick={() => navigate(-1)} />
              <h1> {data?.paperName} </h1>
              <PrimaryButton title="编辑" handleClick={() => navigate(`/editpaper/${paperid}`)} />
              <Button type="primary" danger size="large" shape="round">
                删除
              </Button>
            </Space>
          )}
        </TitleWrapper>
        {dataList.map((i, d) => (
          <ItemWrapper key={d}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore: 数字id? */}
            {mapper[i.questionType.toString()](i, d + 1)}
          </ItemWrapper>
        ))}
        {(data && data.questionOfPaperVos.length) || <Empty />}
      </TestPaperPreviewWrapper>
    </>
  )
}

export default TestPaperPreview
