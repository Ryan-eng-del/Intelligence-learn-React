// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// antd
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
// pages
import {
  ClassInfoPage,
  HomePage,
  LoginPage,
  CreateExamPage,
  QuestionBankPage,
  CreateQuestionPage,
  QuestionPreviewPage
} from 'pages'
import { LearnPage, TeachPage, InboxPage, SettingPage, ExamSummary,
  ProfilePage } from 'pages/HomePage/cpn-page'
import { ChapterPage, ResourcePage, ExamPage, DiscussPage, ClassManaPage, KnowledgePage } from 'pages/ClassInfoPage'
import { RequireAuth } from 'util/requireAuth'
import { KnowledgeGraph } from './pages/K-graphPage/KnowledgeGraph'
import { TeacherSourcePreviewPage } from './pages/TeacherSourcePreviewPage/TeacherSourcePreviewPage'
import { SourceVideoPreview,SourcePdfPreview } from './pages/TeacherSourcePreviewPage'
import { QuestionEditPage } from 'publicComponents/CreateQuestionPage'
import { MkGraph } from 'pages/MK-graphPage/MkGraph'
import { PaperDoing } from 'pages/PaperDoingPage/paperDoingPage'
import { ClassTimeDispatchContextProvider } from 'context/ChapterStudyTree/ClassTimeDispatchContext'
import { QuestionDoingPage } from 'pages/QuestionDoingPage/QuestionDoingPage'

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
        <Routes>
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
              <Route path="profile" element={<ProfilePage />} />
              <Route path="community" element={<ProfilePage />} />
              <Route path="teach" element={<TeachPage />} />
              <Route path="learn" element={<LearnPage />} />
              <Route path="inbox" element={<InboxPage />} />
              <Route path="setting" element={<SettingPage />} />
              <Route path="exam" element={<ExamSummary />} />
            </Route>
            <Route path="classinfo" element={<ClassInfoPage />}>
              <Route path="chapter" element={<ChapterPage />} />
              <Route path="exam" element={<ExamPage />} />
              <Route path="resource" element={<ResourcePage />} />
              <Route path="discuss" element={<DiscussPage />} />
              <Route path="class" element={<ClassManaPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
              <Route path="questionbank" element={<QuestionBankPage />} />
            </Route>
            <Route path={'k-graph'} element={<KnowledgeGraph />} />
            <Route path={'mk-graph'} element={<MkGraph />} />
            <Route path="editpaper/:paperid" element={<CreateExamPage />} />
            {/* <Route
              path="previewtestpaper/:paperid"
              element={<TestPaperPreview />}
            /> */}
            <Route
              path="teacher-preview"
              element={<TeacherSourcePreviewPage />}
            >
              <Route path="video/:id" element={<SourceVideoPreview />} />
              <Route path="pdf/:id" element={<SourcePdfPreview />} />
            </Route>
            <Route path="resource-video/:id" element={<SourceVideoPreview />} />
            <Route path="resource-pdf/:id" element={<SourcePdfPreview />} />
            <Route path="createquestion" element={<CreateQuestionPage />} />
            <Route
              path="preview/:questionId"
              element={<QuestionPreviewPage />}
            />
            <Route
              path="promote/:questionId"
              element={<QuestionDoingPage />}
            />
            <Route path="edit/:questionId" element={<QuestionEditPage />} />
            <Route path="homeWork/:paperId" element={<PaperDoing />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
    <ClassTimeDispatchContextProvider>
      <ConfigProvider locale={zhCN}>
        <ReactQueryDevtools initialIsOpen />
        <Router>
          <Routes>
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
                <Route path="exam" element={<ExamSummary />} />
              </Route>
              <Route path="classinfo" element={<ClassInfoPage />}>
                <Route path="chapter" element={<ChapterPage />} />
                <Route path="exam" element={<ExamPage />} />
                <Route path="resource" element={<ResourcePage />} />
                <Route path="discuss" element={<DiscussPage />} />
                <Route path="class" element={<ClassManaPage />} />
                <Route path="knowledge" element={<KnowledgePage />} />
                <Route path="questionbank" element={<QuestionBankPage />} />
              </Route>
              <Route path="studentClassinfo" element={<ClassInfoPage />}>
                <Route path="chapter" element={<ChapterPage />} />
                <Route path="exam" element={<ExamPage />} />
                <Route path="resource" element={<ResourcePage />} />
                <Route path="discuss" element={<DiscussPage />} />
                <Route path="class" element={<ClassManaPage />} />
                <Route path="knowledge" element={<KnowledgePage />} />
                <Route path="questionbank" element={<QuestionBankPage />} />
              </Route>
              <Route path={'k-graph'} element={<KnowledgeGraph />} />
              <Route path={'mk-graph'} element={<MkGraph />} />
              <Route path="editpaper/:paperid" element={<CreateExamPage />} />
              <Route path="teacher-preview" element={<TeacherSourcePreviewPage />}>
                <Route path="video/:id" element={<SourceVideoPreview />} />
                <Route path="pdf/:id" element={<SourcePdfPreview />} />
              </Route>
              <Route path="createquestion" element={<CreateQuestionPage />} />
              <Route path="preview/:questionId" element={<QuestionPreviewPage />} />
              <Route path="edit/:questionId" element={<QuestionEditPage />} />
              <Route path="homeWork" element={<PaperDoing />}></Route>
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </ClassTimeDispatchContextProvider>
  </QueryClientProvider>
)

reportWebVitals()
