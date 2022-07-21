import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { Footer } from './AppStyle'
import { useMount } from 'hook/useMount'
function App() {
  const navigate = useNavigate()
  useMount(() => navigate('login'))
  return (
    <div className="App">
      
      <Outlet />
      <Footer>2022@Intelligence-Learining</Footer>
    </div>
  )
}

export default App
