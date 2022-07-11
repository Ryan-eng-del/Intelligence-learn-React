import React from 'react'
import './App.css'
import { AvatarWrapper, Footer } from './AppStyle'
import { Avatar } from 'antd'
import { LoginPage } from 'pages/LoginPages/LoginPage'
function App() {
  return (
    <div className="App">
      <AvatarWrapper>
        <Avatar
          size="large"
          src={require('assets/img/1657465165516.png')}
          style={{ backgroundColor: 'rgb(100,255,218)', borderRadius: '12px' }}
        />
      </AvatarWrapper>
      <LoginPage />
      <Footer>2022@Intelligence-Learining</Footer>
    </div>
  )
}

export default App
