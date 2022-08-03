import React from 'react'
import { useMount } from 'hook/useMount'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { registerFormulaModule } from 'util/registerEditor'

function App() {
  const navigate = useNavigate()
  useMount(() => navigate('/home/class/teach'))
  useMount(registerFormulaModule) // 注册富文本编辑器的公式插件
  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

export default App
