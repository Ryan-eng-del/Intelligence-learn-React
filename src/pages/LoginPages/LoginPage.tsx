import React from 'react'
import { LoginPageWrapper, AvatarWrapper } from './LoginPageStyle'
import { LoginForm, LoginIntro } from 'components/LoginPage'
import { Avatar } from 'antd'

export const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <AvatarWrapper>
        <Avatar
          size="large"
          src={require('assets/img/1657465165516.png')}
          style={{ backgroundColor: 'rgb(100,255,218)', borderRadius: '12px' }}
        />
      </AvatarWrapper>
      <LoginIntro />
      <LoginForm />
    </LoginPageWrapper>
  )
}
