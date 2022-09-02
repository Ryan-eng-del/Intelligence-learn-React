import React from 'react'
import { useMount } from 'hook/useMount'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import cache from './util/cache'
import { registerFormulaModule } from 'util/registerEditor'

function App() {
  const navigate = useNavigate()
  useMount(registerFormulaModule) // 注册富文本编辑器的公式插件

  useMount(() => {
    if (cache.getCache('token')) {
      console.log('token exist')
      navigate('home/class/teach')
    }
  })
  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

export default App
