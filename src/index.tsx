import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { ClassInfoPage, HomePage, LoginPage } from 'pages'
import { LearnPage, TeachPage } from 'pages/HomePage/cpn-page'
import {
  ChapterPage,
  ResourcePage,
  ExamPage,
  DiscussPage,
  ClassManaPage,
  KnowledgePage
} from 'pages/ClassInfoPage/cpn-page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChapterInfo } from 'pages/ChapterInfo'
import zhCN from 'antd/es/locale/zh_CN'
import { RequireAuth } from 'util/requireAuth'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={zhCN}>
      <ReactQueryDevtools initialIsOpen />
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />}></Route>
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
              </Route>
            </Route>
            <Route path="classinfo" element={<ClassInfoPage />}>
              <Route path="chapter" element={<ChapterPage />} />
              <Route path="exam" element={<ExamPage />} />
              <Route path="resource" element={<ResourcePage />} />
              <Route path="discuss" element={<DiscussPage />} />
              <Route path="class" element={<ClassManaPage />}></Route>
              <Route path="knowledge" element={<KnowledgePage />}></Route>
            </Route>
            <Route path="chapterinfo" element={<ChapterInfo />}>
              {/* ChapterID */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  </QueryClientProvider>
)

reportWebVitals()
