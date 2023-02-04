import { Layout } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useShowQuestionForStudent } from 'server/fetchExam/TestPaper'
import { QuestionType, StudentPaper } from 'server/fetchExam/types'
import { BaseSpin } from '../../baseUI/BaseSpin/BaseSpin'
import { Menu } from './Menu/Menu'
import { QuestionList } from './QuestionList/QuestionList'
import { Title } from './Title/theTitle'

const { Header, Sider, Content } = Layout

const PaperDoing: React.FC = () => {
  // 需要路由获取参数
  const { paperId } = useParams()
  const { data, isLoading } = useShowQuestionForStudent(paperId!)
  console.log(data, paperId, 'data')

  const len = (data: StudentPaper) => {
    if (data) {
      const list = data.questionOfPaperVOS
      return [
        list.filter((i) => i.questionType == QuestionType.single).length,
        list.filter((i) => i.questionType == QuestionType.multiple).length,
        list.filter((i) => i.questionType == QuestionType.fillBlank).length,
        list.filter((i) => i.questionType == QuestionType.shortAnswer).length,
        list.filter((i) => i.questionType == QuestionType.judge).length
      ]
    } else {
      return []
    }
  }
  const [open, setOpen] = useState(true)

  const onClose = () => {
    setOpen(false)
  }

  const Time = Date.now()
  return (
    <>
      {isLoading ? (
        <BaseSpin size="large" />
      ) : (
        <Layout style={{ backgroundColor: 'white' }}>
          <Header
            style={{
              position: 'sticky',
              top: 0,
              backgroundColor: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
              zIndex: 100
            }}
          >
            <Title
              paperName={data?.paperName || '试卷'}
              num={data?.questionOfPaperVOS?.length}
              time={Time}
              score={data?.questionOfPaperVOS?.reduce((p, c) => p + (c.questionScore ? c.questionScore : 0), 0)}
            />
          </Header>
          <Layout>
            <Sider
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
            </Sider>
            <Content style={{ fontSize: 'large', backgroundColor: 'white' }}>
              <QuestionList Questionlist={data?.questionOfPaperVOS} />
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  )
}

export default PaperDoing
