import React from 'react'
import { Title } from './Title/theTitle'
import { Menu } from './Menu/Menu'
import { QuestionList } from './QuestionList/QuestionList'
import { Layout } from 'antd'
import { QuestionType, StudentPaperItem } from 'server/fetchExam/types'
import { useShowQuestionForStudent } from 'server/fetchExam/TestPaper'
import { useParams } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const Questionlist: any[] = [
  {
    questionName:
      '555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555',
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

export const PaperDoing: React.FC = () => {
  // 需要路由获取参数
  const { paperId } = useParams()
  const { isSuccess } = useShowQuestionForStudent(paperId!)
  const data = {
    paperId: '1559401k362804965378',
    paperName: '第一次月考',
    questionOfPaperVos: [
      {
        questionId: '155834475017888r5633',
        questionDescription: '测试用单选题',
        questionOption: 'A:1<>B:2<>C:3<>D:4',
        questionType: 0,
        questionAnswerNum: 1,
        questionScore: 1
      },
      {
        questionId: '1558345138s294611969',
        questionDescription: '测试用多选题',
        questionOption: 'A:1<>B:2<>C:3<>D:4',
        questionType: 1,
        questionAnswerNum: 1,
        questionScore: 1
      },
      {
        questionId: '1558345a138s294611969',
        questionDescription: '测试用填空',
        questionOption: 'A:1<>B:2<>C:3<>D:4',
        questionType: 2,
        questionAnswerNum: 1,
        questionScore: 1
      },
      {
        questionId: '155834522a138s294611969',
        questionDescription: '测试用填空222',
        questionOption: '',
        questionType: 2,
        questionAnswerNum: 4,
        questionScore: 1
      },
      {
        questionId: '155834d5138s294611969',
        questionDescription: '测试用简答',
        questionOption: 'A:1<>B:2<>C:3<>D:4',
        questionType: 3,
        questionAnswerNum: 1,
        questionScore: 1
      },
      {
        questionId: '155834d513s24611969',
        questionDescription: '测试用判断题',
        questionOption: 'A:1<>B:2<>C:3<>D:4',
        questionType: 4,
        questionAnswerNum: 1,
        questionScore: 1
      }
    ]
  }

  const len = (list: StudentPaperItem[]) => {
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
      <Layout style={{ backgroundColor: 'white' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            borderBottom: 'solid 1px',
            zIndex: 100
          }}
        >
          <Title paperName={data!.paperName} />
        </Header>
        <Layout>
          <Sider
            style={{
              position: 'sticky',
              top: 84,
              backgroundColor: 'white',
              border: '1px solid',
              borderRadius: 5,
              height: 600,
              width: 300
            }}
          >
            <Menu num={len(data.questionOfPaperVos)} />
          </Sider>
          <Content style={{ fontSize: 'large', backgroundColor: 'white' }}>
            <QuestionList Questionlist={data!.questionOfPaperVos} />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
