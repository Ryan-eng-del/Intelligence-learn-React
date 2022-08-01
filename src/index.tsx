import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import { ClassInfoPage, HomePage, LoginPage, CreateExamPage } from 'pages'
import { LearnPage, TeachPage } from 'pages/HomePage/cpn-page'
=======
import { ClassInfoPage, HomePage, LoginPage } from 'pages'
import { LearnPage, TeachPage, InboxPage } from 'pages/HomePage/cpn-page'
>>>>>>> c1b66a7c6b4c406cdc859b4274b2cc93a9d0b73c
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
import { ChapterPreviewFile } from './pages/ChapterInfo'
import zhCN from 'antd/es/locale/zh_CN'
import { RequireAuth } from 'util/requireAuth'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()

root.render(
<<<<<<< HEAD
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="home" element={<HomePage />}>
            <Route path="class">
              <Route path="teach" element={<TeachPage />} />
              <Route path="learn" element={<LearnPage />} />
=======
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
                <Route path="inbox" element={<InboxPage />} />
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
>>>>>>> c1b66a7c6b4c406cdc859b4274b2cc93a9d0b73c
            </Route>
            <Route path="study" element={<ChapterPreviewFile />}></Route>
          </Route>
<<<<<<< HEAD
          <Route path="classinfo" element={<ClassInfoPage />}>
            <Route path="chapter" element={<ChapterPage />} />
            <Route path="exam" element={<ExamPage />} />
            <Route path="resource" element={<ResourcePage />} />
            <Route path="discuss" element={<DiscussPage />} />
            <Route path="classmana" element={<ClassManaPage />}></Route>
            <Route path="knowledge" element={<KnowledgePage />}></Route>
          </Route>
          <Route path="chapterinfo" element={<ChapterInfo />}>
            {/* ChapterID */}
          </Route>
          <Route path="createexam" element={<CreateExamPage />}></Route>
        </Route>
      </Routes>
    </Router>
  </ConfigProvider>
  // {/* </React.StrictMode> */}
=======
        </Routes>
      </Router>
    </ConfigProvider>
  </QueryClientProvider>
>>>>>>> c1b66a7c6b4c406cdc859b4274b2cc93a9d0b73c
)

reportWebVitals()
