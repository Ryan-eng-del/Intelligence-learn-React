// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
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
  QuestionPreviewPage,
  StudentClassInfoPage
} from 'pages'
import { ExamSummary, InboxPage, LearnPage, ProfilePage, TeachPage } from 'pages/HomePage/cpn-page'
import { ChapterPage, ClassManaPage, DiscussPage, ExamPage, KnowledgePage, ResourcePage } from 'pages/ClassInfoPage'
import {
  StudentChapterPage,
  StudentDiscussPage,
  StudentExamPage,
  StudentKnowledgePage,
  StudentResourcePage
} from 'pages/StudentClassInfoPage'

// util
import { RequireAuth } from 'util/requireAuth'
import { KnowledgeGraph } from './pages/K-graphPage/KnowledgeGraph'
import { TeacherSourcePreviewPage } from './pages/TeacherSourcePreviewPage/TeacherSourcePreviewPage'
import { SourceVideoPreview } from './pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/SourceVideoPreview'
import { SourcePdfPreview } from './pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/SourcePdfPreview'
import { QuestionEditPage } from 'publicComponents/CreateQuestionPage'
import { MkGraph } from 'pages/MK-graphPage/MkGraph'
import { TestExcel } from 'pages/testExcel'
import { ClassTimeDispatchContextProvider } from './context/ChapterStudyTree/ClassTimeDispatchContext'

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
                {/* <Route path="class"> */}
                <Route path="teach" element={<TeachPage />} />
                <Route path="learn" element={<LearnPage />} />
                <Route path="inbox" element={<InboxPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="exam" element={<ExamSummary />} />
                {/* </Route> */}
              </Route>
              <Route path="excel" element={<TestExcel />} />
              <Route path="classinfo" element={<ClassInfoPage />}>
                <Route path="chapter" element={<ChapterPage />} />
                <Route path="exam" element={<ExamPage />} />
                <Route path="resource" element={<ResourcePage />} />
                <Route path="discuss" element={<DiscussPage />} />
                <Route path="class" element={<ClassManaPage />} />
                <Route path="knowledge" element={<KnowledgePage />} />
              </Route>
              <Route path="studentclassinfo" element={<StudentClassInfoPage />}>
                <Route path="studentchapter" element={<StudentChapterPage />} />
                <Route path="studentexam" element={<StudentExamPage />} />
                <Route path="studentresource" element={<StudentResourcePage />} />
                <Route path="studentdiscuss" element={<StudentDiscussPage />} />
                <Route path="studentknowledge" element={<StudentKnowledgePage />} />
              </Route>
              <Route path={'k-graph'} element={<KnowledgeGraph />} />
              <Route path={'mk-graph'} element={<MkGraph />} />
              <Route path="editpaper/:paperid" element={<CreateExamPage />} />
              <Route path="teacher-preview" element={<TeacherSourcePreviewPage />}>
                <Route path={'video'}>
                  <Route path=":id" element={<SourceVideoPreview />} />
                </Route>
                <Route path={'pdf'}>
                  <Route path=":id" element={<SourcePdfPreview />} />
                </Route>
              </Route>
              <Route path="questionbank" element={<QuestionBankPage />} />
              <Route path="createquestion" element={<CreateQuestionPage />} />
              <Route path="preview/:questionId" element={<QuestionPreviewPage />} />
              <Route path="edit/:questionId" element={<QuestionEditPage />} />
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </ClassTimeDispatchContextProvider>
  </QueryClientProvider>
)

reportWebVitals()
