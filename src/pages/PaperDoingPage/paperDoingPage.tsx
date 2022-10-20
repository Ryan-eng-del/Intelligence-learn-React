import React from "react"
import { Title } from "./Title/theTitle"
import { Menu } from "./Menu/Menu"
import { PaperDoingWrapper } from "./paperDoingPageStyle"
import { QuestionList, questionOfPaperVosType } from "./QuestionList/QuestionList"
import { Layout } from 'antd';
import { isAbsolute } from "path"
import { HeaderWrapper } from "publicComponents/PageStyle/PageHeaderWapper"
import { useShowQuestionDetails, useShowQuestionForStudent } from "server/fetchExam"

const { Header, Footer, Sider, Content } = Layout;


export const PaperDoing: React.FC = () => {
  // 需要路由获取参数
  const { data, isSuccess } = useShowQuestionForStudent("11")
  //useShowQuestionForStudent 会慢一拍,没有获取数据则显示报错
  return (
    <>
      <Layout style={{ backgroundColor: 'white' }}>
        <Header style={{ position: 'sticky', top: 0, backgroundColor: 'white', borderBottom: 'solid 1px', }}>
          {
            isSuccess &&
            <Title paperName={data!.paperName} />
          }
        </Header>
        <Layout>
          <Sider style={{ position: 'sticky', top: 64, backgroundColor: 'white', border: '1px solid', borderRadius: 5, height: 600 }}>
            <Menu num={0} />
          </Sider>
          <Content style={{ fontSize: 'large', backgroundColor: 'white' }}>
          {
            isSuccess &&
            <QuestionList Questionlist={data!.questionOfPaperVos} />
          }
          </Content>
        </Layout>
      </Layout>
    </>
  )
}