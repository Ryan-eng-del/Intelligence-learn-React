import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer } from './AppStyle'
function App() {
  return (
    <div className="App">
      <Outlet />
      <Footer>2022@Intelligence-Learining</Footer>
    </div>
  )
}

export default App
