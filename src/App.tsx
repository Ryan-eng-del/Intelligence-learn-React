import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import './App.css'
import { Footer } from './AppStyle'
function App() {
  // const navigate = useNavigate()
  // useMount(() => navigate('login'))
  return (
    <div className="App">
      {/* 当Navigate挂载将重定向至login */}
      <Navigate to={'login'}></Navigate>
      <Outlet />
      <Footer>2022@Intelligence-Learining</Footer>
    </div>
  )
}

export default App
