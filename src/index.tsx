// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'index.css'
import App from 'App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// antd
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
// pages
import {
  ClassInfoPage,
  CreateExamPage,
  CreateQuestionPage,
  HomePage,
  LoginPage,
  QuestionBankPage,
  QuestionPreviewPage
} from 'pages'
import { ExamSummary, InboxPage, LearnPage, ProfilePage, SettingPage, TeachPage } from 'pages/HomePage/cpn-page'
import { ChapterPage, DiscussPage, ExamPage, KnowledgePage, ResourcePage } from 'pages/ClassInfoPage'
import { RequireAuth } from 'util/requireAuth'
import { KnowledgeGraph } from 'pages/K-graphPage/KnowledgeGraph'
import { TeacherSourcePreviewPage } from 'pages/TeacherSourcePreviewPage/TeacherSourcePreviewPage'
import { SourcePdfPreview, SourceVideoPreview } from 'pages/TeacherSourcePreviewPage'
import { QuestionEditPage } from 'publicComponents/CreateQuestionPage'
import { MkGraph } from 'pages/MK-graphPage/MkGraph'
import { PaperDoing } from 'pages/PaperDoingPage/paperDoingPage'
import { ClassMana } from 'pages/ClassInfoPage/cpn-page/ClassManaPage/ClassManaPage'
import ContextProvider from 'context'
import RegisterPage from './pages/LoginPages/RegisterPage'
import { SourceImgPreview } from './pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/IMagePreview'
import { QuestionDoingPage } from 'pages/QuestionDoingPage/QuestionDoingPage'
import { TestPaperPreview } from 'components/CreateExamPage/CreateExamPreview/TestPaperPreview'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
})

root.render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={zhCN}>
      <ReactQueryDevtools initialIsOpen />
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <App />
                </RequireAuth>
              }
            >
              <Route path="home" element={<HomePage />}>
                <Route path="teach" element={<TeachPage />} />
                <Route path="learn" element={<LearnPage />} />
                <Route path="inbox" element={<InboxPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="setting" element={<SettingPage />} />
                <Route path="exam" element={<ExamSummary />} />
              </Route>

              <Route path=":identify/:id" element={<ClassInfoPage />}>
                <Route path="chapter" element={<ChapterPage />} />
                <Route path="exam" element={<ExamPage />} />
                <Route path="resource" element={<ResourcePage />} />
                <Route path="discuss" element={<DiscussPage />} />
                <Route path="class" element={<ClassMana />} />
                <Route path="knowledge" element={<KnowledgePage />} />
                <Route path="questionbank" element={<QuestionBankPage />} />
                <Route path={'k-graph'} element={<KnowledgeGraph />} />
                <Route path={'mk-graph'} element={<MkGraph />} />
                <Route path="createquestion" element={<CreateQuestionPage />} />
              </Route>

              <Route path=":identify/:id" element={<ClassInfoPage />}>
                <Route path="chapter" element={<ChapterPage />}>
                  <Route path="teacher-preview" element={<TeacherSourcePreviewPage />}>
                    <Route path="video/:resourceId" element={<SourceVideoPreview />} />
                    <Route path="pdf/:resourceId" element={<SourcePdfPreview />} />
                    <Route path="img/:resourceId" element={<SourceImgPreview />} />
                  </Route>
                </Route>
                <Route path="exam" element={<ExamPage />}>
                  <Route path="editpaper" element={<CreateExamPage />} />
                </Route>
                <Route path="resource" element={<ResourcePage />} />
                <Route path="discuss" element={<DiscussPage />} />
                <Route path="knowledge" element={<KnowledgePage />} />
                <Route path="questionbank" element={<QuestionBankPage />} />
                <Route path={'k-graph'} element={<KnowledgeGraph />} />
                <Route path={'mk-graph'} element={<MkGraph />} />
              </Route>

              {/* 预览试卷 */}
              <Route path="previewtestpaper/:paperid" element={<TestPaperPreview />} />
              {/* 刷题 */}
              <Route path="promote/:questionId" element={<QuestionDoingPage />} />
              {/* 编辑题目 */}
              <Route path="edit/:questionId" element={<QuestionEditPage />} />
              {/* 做试卷 */}
              <Route path="homeWork" element={<PaperDoing />}></Route>
            </Route>
          </Routes>
        </ContextProvider>
      </Router>
    </ConfigProvider>
  </QueryClientProvider>
)

reportWebVitals()
