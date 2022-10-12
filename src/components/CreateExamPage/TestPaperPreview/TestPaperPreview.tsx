import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowTestPaper } from 'server/fetchExam/TestPaper'
import { QuestionDataWithID, QuestionList, QuestionType } from 'server/fetchExam/types'
import { Preview as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Preview'
import { Preview as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Preview'
import { Preview as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Preview'
import { Preview as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Preview'
import { Preview as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Preview'
import { ItemWrapper, TestPaperPreviewWrapper, TitleWrapper } from './TestPaperPreviewStyle'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const TestPaperPreview: React.FC = () => {
  const { paperid } = useParams()
  const [dataList, setData] = useState<QuestionList[]>([])
  const { data, isLoading } = useShowTestPaper(paperid!, setData) // 打开试卷

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
          </Space> }
        </TitleWrapper>
        {
          dataList.map(q=>(<div key={q.type}>{
            q.isExists ? q.questiton.map(i=>(
              <ItemWrapper key={i.item_data.questionId}>
                { mapper[q.type](i.item_data) }
                本题得分: {i.score}
              </ItemWrapper>)) : <></>
          }</div>))
        }
      </TestPaperPreviewWrapper>
    </>
  )
}
