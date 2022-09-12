// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, Routes } from 'react-router-dom'
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
import {
  LearnPage,
  TeachPage,
  InboxPage,
  ProfilePage
} from 'pages/HomePage/cpn-page'
import {
  ChapterPage,
  ResourcePage,
  ExamPage,
  DiscussPage,
  ClassManaPage,
  KnowledgePage
} from 'pages/ClassInfoPage'
import { ChapterInfo, ChapterPreviewFile } from 'pages/ChapterInfo'
import {
  SingleChoice,
  MultipleChoice,
  FillBlank,
  ShortAnswer,
  Programming,
  Judge
} from 'publicComponents/CreateQuestionPage/CreateQuestionRoutePage'
import { QuestionPreview } from 'publicComponents/CreateQuestionPage'

// util
import { RequireAuth } from 'util/requireAuth'
import { KnowledgeGraph } from './pages/K-graphPage/KnowledgeGraph'
import { TeacherSourcePreviewPage } from './pages/TeacherSourcePreviewPage/TeacherSourcePreviewPage'
import { SourcePreviewPage } from './pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/SourcePreviewPage'

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
              <Route path="teach" element={<TeachPage />} />
              <Route path="learn" element={<LearnPage />} />
              <Route path="inbox" element={<InboxPage />} />
            </Route>
            <Route path="classinfo" element={<ClassInfoPage />}>
              <Route path="chapter" element={<ChapterPage />} />
              <Route path="exam" element={<ExamPage />} />
              <Route path="resource" element={<ResourcePage />} />
              <Route path="discuss" element={<DiscussPage />} />
              <Route path="class" element={<ClassManaPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
            </Route>
            <Route path={'k-graph'} element={<KnowledgeGraph />} />

            <Route path="chapterinfo" element={<ChapterInfo />}>
              {/* ChapterID */}
            </Route>
            <Route path="study" element={<ChapterPreviewFile />} />
            <Route path="createexam" element={<CreateExamPage />}>
              <Route path="single" element={<SingleChoice />} />
              <Route path="multiple" element={<MultipleChoice />} />
              <Route path="fillBlank" element={<FillBlank />} />
              <Route path="shortanswer" element={<ShortAnswer />} />
              <Route path="programming" element={<Programming />} />
              <Route path="judge" element={<Judge />} />
            </Route>
            <Route
              path="teacher-preview"
              element={<TeacherSourcePreviewPage />}
            >
              <Route path=":id" element={<SourcePreviewPage />} />
            </Route>
            <Route path="questionbank" element={<QuestionBankPage />} />
            <Route path="createquestion" element={<CreateQuestionPage />}>
              <Route path="single" element={<SingleChoice />} />
              <Route path="multiple" element={<MultipleChoice />} />
              <Route path="fillBlank" element={<FillBlank />} />
              <Route path="shortanswer" element={<ShortAnswer />} />
              <Route path="programming" element={<Programming />} />
              <Route path="judge" element={<Judge />} />
              <Route path="preview" element={<QuestionPreview />}></Route>
            </Route>
            <Route path="preview" element={<QuestionPreviewPage />}></Route>
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  </QueryClientProvider>
)

reportWebVitals()
