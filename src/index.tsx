import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { ClassInfoPage, HomePage, LoginPage } from 'pages'
import { LearnPage, TeachPage, InboxPage } from 'pages/HomePage/cpn-page'
import {
  ChapterPage,
  ResourcePage,
  ExamPage,
  DiscussPage,
  ClassManaPage,
  KnowledgePage
} from 'pages/ClassInfoPage/cpn-page'
import { ChapterInfo } from 'pages/ChapterInfo'
import { ChapterPreviewFile } from './pages/ChapterInfo'
import zhCN from 'antd/es/locale/zh_CN'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="home" element={<HomePage />}>
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
              <Route path="classmana" element={<ClassManaPage />}></Route>
              <Route path="knowledge" element={<KnowledgePage />}></Route>
            </Route>
            <Route path="chapterinfo" element={<ChapterInfo />}>
              {/* ChapterID */}
            </Route>
            <Route path="study" element={<ChapterPreviewFile />}></Route>
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
