import React from 'react'
import { Title } from './Title/theTitle'
import { Menu } from './Menu/Menu'
import { QuestionList } from './QuestionList/QuestionList'
import { Layout } from 'antd'
import { useParams } from 'react-router-dom'
import { QuestionType, StudentPaper } from 'server/fetchExam/types'
import { useShowQuestionForStudent } from 'server/fetchExam/TestPaper'
import Skeletons from '../../publicComponents/Skeleton/index'

const { Header, Sider, Content } = Layout

const Questionlist: any[] = [
  {
    questionName: '555555555555555555555555555',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 1
  },
  {
    questionName: '2+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 2
  },
  {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  },
  {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  },
  {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  },
  {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  },
  {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  }
]

const PaperDoing: React.FC = () => {
  // 需要路由获取参数
  const { paperId } = useParams()
  const { data, isLoading } = useShowQuestionForStudent(paperId!)

  const len = (data: StudentPaper) => {
    const list = data.questionOfPaperVos
    return [
      list.filter((i) => i.questionType == QuestionType.single).length,
      list.filter((i) => i.questionType == QuestionType.multiple).length,
      list.filter((i) => i.questionType == QuestionType.fillBlank).length,
      list.filter((i) => i.questionType == QuestionType.shortAnswer).length,
      list.filter((i) => i.questionType == QuestionType.judge).length
    ]
  }

  return (
    <>
      {data == undefined ? (
        <Skeletons size="middle" />
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
            <Title paperName={data!.paperName} />
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
              <Menu num={len(data)} />
            </Sider>
            <Content style={{ fontSize: 'large', backgroundColor: 'white' }}>
              <QuestionList Questionlist={data.questionOfPaperVos} />
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  )
}

export default PaperDoing
