import React from 'react'
import { LoginPageWrapper } from './LoginPageStyle'
import { LoginForm, LoginIntro } from 'components/LoginPage'

export const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <LoginIntro />
      <LoginForm />
    </LoginPageWrapper>
  )
}
