import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { PrimaryButton } from 'publicComponents/Button'
import { Preview as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Preview'
import { Preview as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Preview'
import { Preview as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Preview'
import { Preview as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Preview'
import { Preview as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Preview'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteTestPaper, useShowTestPaper } from 'server/fetchExam/TestPaper'
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
  const { mutate: del } = useDeleteTestPaper()

  type T = { content: QuestionDataWithID; No: number }
  const mapper = {
    [QuestionType.single]: (args: T) => <P1 {...args} />,
    [QuestionType.multiple]: (args: T) => <P2 {...args} />,
    [QuestionType.fillBlank]: (args: T) => <P3 {...args} />,
    [QuestionType.shortAnswer]: (args: T) => <P4 {...args} />,
    [QuestionType.judge]: (args: T) => <P5 {...args} />
  }
  const zhCN_number = ['一', '二', '三', '四', '五']
  const zhCN_name = ['单选', '多选', '填空', '简答', '判断']
  Object.keys(mapper)
  return (
    <>
      <TestPaperPreviewWrapper>
        {/* 试卷头 */}
        <TitleWrapper>
          {isLoading ? (
            <BaseLoading />
          ) : (
            <div className="title">
              <Button icon={<ArrowLeftOutlined />} shape="circle" size="large" onClick={() => navigate(-1)} />
              <div className="paperName"> {data?.paperName}</div>
              <Space>
                <PrimaryButton title="编辑" handleClick={() => navigate(`/editpaper/${paperid}`)} />
                <Button type="primary" danger size="large" shape="round" onClick={() => del(paperid!)}>
                  删除
                </Button>
              </Space>
            </div>
          )}
        </TitleWrapper>
        {/* 其他信息 */}
        <div>{`试卷总分：${dataList.reduce((p, c) => p + c.questionScore, 0)} 分 | 共 ${
          dataList.length
        } 题 | 及格分数：60 分 | 允许重做 | 重做次数：${3} 次 | 取最高分 `}</div>
        <br />
        {/* 题目列表 */}
        {Object.keys(mapper).map((Type, index) => {
          const filtered = dataList.filter((q) => q.questionType == Type)
          return filtered.length != 0 ? (
            <>
              <h1>
                <b>{`${zhCN_number[index]}、${zhCN_name[index]}题（共${filtered.length}道，${filtered.reduce(
                  (p, c) => p + c.questionScore,
                  0
                )}分）`}</b>
              </h1>
              {filtered.map((i, d) => (
                <>
                  <ItemWrapper key={d}>{mapper[i.questionType]({ content: i, No: d + 1 })}</ItemWrapper>
                </>
              ))}
            </>
          ) : (
            <></>
          )
        })}
      </TestPaperPreviewWrapper>
    </>
  )
}

export default TestPaperPreview
