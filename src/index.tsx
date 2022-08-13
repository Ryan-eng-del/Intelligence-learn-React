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
import { ClassInfoPage, HomePage, LoginPage, CreateExamPage } from 'pages'
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
} from 'pages/CreateExamPage'

// util
import { RequireAuth } from 'util/requireAuth'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
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
          <Route path="/" element={<App />}>
            <Route
              path="home"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            >
              <Route path="class">
                <Route path="teach" element={<TeachPage />} />
                <Route path="learn" element={<LearnPage />} />
                <Route path="inbox" element={<InboxPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Route>
            <Route path="classinfo" element={<ClassInfoPage />}>
              <Route path="chapter" element={<ChapterPage />} />
              <Route path="exam" element={<ExamPage />} />
              <Route path="resource" element={<ResourcePage />} />
              <Route path="discuss" element={<DiscussPage />} />
              <Route path="class" element={<ClassManaPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
            </Route>
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
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  </QueryClientProvider>
)

reportWebVitals()
