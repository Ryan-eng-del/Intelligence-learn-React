import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.variable.min.css'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage } from 'pages'
import { LearnPage, TeachPage } from 'pages/HomePage/cpn-page'
ConfigProvider.config({
  theme: {
    primaryColor: '#64ffda'
  }
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="home" element={<HomePage />}>
            <Route path="class">
              <Route path="teach" element={<TeachPage />} />
              <Route path="learn" element={<LearnPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
