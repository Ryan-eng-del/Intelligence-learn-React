import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowTestPaper } from 'server/fetchExam/TestPaper'
import {
  QuestionDataWithID,
  QuestionList,
  QuestionType,
  TestPaper
} from 'server/fetchExam/types'
import { Preview as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Preview'
import { Preview as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Preview'
import { Preview as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Preview'
import { Preview as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Preview'
import { Preview as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Preview'
import {
  ItemWrapper,
  TestPaperPreviewWrapper,
  TitleWrapper
} from './TestPaperPreviewStyle'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { dropRight } from 'lodash'
import { config } from 'server/fetchExam/config'

export const TestPaperPreview: React.FC = () => {
  const { paperid } = useParams()
  const [dataList, setData] = useState<QuestionList[]>([])
  const { data, isLoading } = useShowTestPaper(paperid!, setData) // 打开试卷
  const Process = (data: TestPaper) => {
    // 接下来进行数据分组
    // get enum type value and key ,
    // e.g.: enum { 'name1', 'name2' } => ['0','1','name1','name2']
    const QuestionTypeList = Object.keys(QuestionType)
    // remove:  ['0','1','name1','name2'] => [ 0, 1 ]
    const QuestionTypeList2 = dropRight(
      QuestionTypeList,
      QuestionTypeList.length / 2
    ).map((i) => parseInt(i))
    return QuestionTypeList2.map((Type: QuestionType) => {
      // 获取类型
      // 这里是过滤了类型的WholeQuestion[]
      const thisTypeList = data.questionOfPaperVos.filter(
        (i) => i.questionType === Type
      )
      return {
        type: Type,
        name: config[Type].name,
        min: config[Type].min,
        max: config[Type].max,
        defaultScore: config[Type].defaultScore,
        amount: thisTypeList.length,
        isExists: thisTypeList.length != 0,
        questiton: thisTypeList.map((i) => ({
          score: 1,
          item_key: i.questionId,
          item_data: { ...i, courseId: 'unknown' } // FIXME: 等待接口更新courseID字段
        }))
      }
    })
  }
  useEffect(() => {
    if (data) setData(Process(data))
  }, [data])
  const navigate = useNavigate()
  type T = QuestionDataWithID
  const mapper = {
    [QuestionType.single]: (data: T) => <P1 content={data} />,
    [QuestionType.multiple]: (data: T) => <P2 content={data} />,
    [QuestionType.fillBlank]: (data: T) => <P3 content={data} />,
    [QuestionType.shortAnswer]: (data: T) => <P4 content={data} />,
    [QuestionType.judge]: (data: T) => <P5 content={data} />
  }
  return (
    <>
      <TestPaperPreviewWrapper>
        <TitleWrapper>
          {isLoading ? (
            <BaseLoading />
          ) : (
            <Space align="center" size={24}>
              <Button
                icon={<ArrowLeftOutlined />}
                shape="circle"
                onClick={() => navigate(-1)}
              />
              <h1> {data?.paperName} </h1>
              <Button
                onClick={() => navigate(`/editpaper/${paperid}`)}
                type="primary"
              >
                编辑
              </Button>
            </Space>
          )}
        </TitleWrapper>
        {dataList.map((q) => (
          <div key={q.type}>
            {q.isExists ? (
              q.questiton.map((i) => (
                <ItemWrapper key={i.item_data.questionId}>
                  {mapper[q.type](i.item_data)}
                  本题得分: {i.score}
                </ItemWrapper>
              ))
            ) : (
              <></>
            )}
          </div>
        ))}
      </TestPaperPreviewWrapper>
    </>
  )
}
