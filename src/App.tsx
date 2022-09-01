import React from 'react'
import { useMount } from 'hook/useMount'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import cache from './util/cache'

function App() {
  const navigate = useNavigate()
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
