import React from 'react'
import { useMount } from 'hook/useMount'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  // useMount(() => navigate('/home/class/teach'))
  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

export default App
