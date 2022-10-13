import React from "react"
import { Title } from "./Title/theTitle"
import { Menu } from "./Menu/Menu"
import { PaperDoingWrapper } from "./paperDoingPageStyle"
import { QuestionList } from "./QuestionList/QuestionList"
import { Layout } from 'antd';
import { isAbsolute } from "path"
import { HeaderWrapper } from "publicComponents/PageStyle/PageHeaderWapper"
import { questiontype } from "./QuestionListItem/QuestionListItem"

const { Header, Footer, Sider, Content } = Layout;

const Questionlist: questiontype[] = [
  {
    questionName: '555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 1
  }, {
    questionName: '2+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 2
  }, {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  }, {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  }, {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  }, {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  }, {
    questionName: '3+1=?',
    answerA: '1',
    answerB: '2',
    answerC: '3',
    answerD: '4',
    score: 3
  }
]

export const PaperDoing: React.FC = () => {
  return (
    <>
      <Layout style={{ backgroundColor: 'white' }}>
        <Header style={{ position: 'sticky', top: 0, backgroundColor: 'white', borderBottom: 'solid 1px', }}>
          <Title />
        </Header>
        <Layout>
          <Sider style={{ position: 'sticky', top: 64, backgroundColor: 'white',  border: '1px solid', borderRadius: 5,height:600}}>
            <Menu num={Questionlist.length}/>
          </Sider>
          <Content style={{fontSize:'large',backgroundColor: 'white'}}>
            <QuestionList Questionlist={Questionlist}/>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}