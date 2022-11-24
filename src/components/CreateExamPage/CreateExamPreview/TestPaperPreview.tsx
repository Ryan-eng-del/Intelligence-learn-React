import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowTestPaper } from 'server/fetchExam/TestPaper'
import { QuestionDataWithID,  QuestionType,  WholeQuestion } from 'server/fetchExam/types'
import { Preview as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Preview'
import { Preview as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Preview'
import { Preview as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Preview'
import { Preview as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Preview'
import { Preview as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Preview'
import { ItemWrapper, TestPaperPreviewWrapper, TitleWrapper } from './TestPaperPreviewStyle'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { Button, Empty, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const TestPaperPreview: React.FC = () => {
  const { paperid } = useParams()
  const [dataList, setData] = useState<Array<WholeQuestion & { questionScore: number }>>([])
  const { data, isLoading } = useShowTestPaper(paperid!) // 打开试卷
  useEffect(() => {
    data && setData(data.questionOfPaperVos)
  }, [data])

  const navigate = useNavigate()
  type T = QuestionDataWithID
  const mapper = {
    [QuestionType.single]:(data:T)=><P1 content={data}/>,
    [QuestionType.multiple]:(data:T)=><P2 content={data}/>,
    [QuestionType.fillBlank]:(data:T)=><P3 content={data}/>,
    [QuestionType.shortAnswer]:(data:T)=><P4 content={data}/>,
    [QuestionType.judge]:(data:T)=><P5 content={data}/>
  }
  return (
    <>
      <TestPaperPreviewWrapper>
        <TitleWrapper>
          { isLoading ? <BaseLoading /> : <Space align='center' size={24}>
            <Button icon={<ArrowLeftOutlined />} shape='circle' onClick={()=>navigate(-1)}/>
            <h1> { data?.paperName } </h1>
            <Button onClick={()=>navigate(`/editpaper/${paperid}`)} type='primary'>编辑</Button>
            <Button type='primary' danger>删除</Button>
          </Space> }
        </TitleWrapper>
        {dataList.map((i,d)=>
          <ItemWrapper key={d}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore: 数字id? */}
            {mapper[i.questionType.toString()](i)}
          </ItemWrapper>)
        }
        { data && data.questionOfPaperVos.length || <Empty/> }
      </TestPaperPreviewWrapper>
    </>
  )
}
