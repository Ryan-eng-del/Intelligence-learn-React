import React from 'react'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate
} from 'react-router-dom'
import './App.css'
import { Footer } from './AppStyle'
import { LoginPage, HomePage } from 'pages'
import { useMount } from 'hook/useMount'
function App() {
  const navigate = useNavigate()
  useMount(() => navigate('login'))
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="home" element={<HomePage />}></Route>
      </Routes>
      <Footer>2022@Intelligence-Learining</Footer>
    </div>
  )
}

export default App
