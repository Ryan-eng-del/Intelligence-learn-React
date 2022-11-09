import React, { useState } from 'react'
import { LoginPageWrapper, AvatarWrapper } from './LoginPageStyle'
import { LoginForm, LoginIntro, RegisterForm } from 'components/LoginPage'
import { Avatar } from 'antd'
import { useToken } from 'server/fetchLogin'
import { BaseLoading } from '../../baseUI/BaseLoding/BaseLoading'

export const LoginPage: React.FC = () => {
  const { mutate, isLoading } = useToken()
  const [loginIn, setLoginIn] = useState(true)

  if (isLoading)
    return (
      <BaseLoading
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    )

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
      {loginIn ? (
        <LoginForm mutate={mutate} routeToRegister={() => setLoginIn(false)} />
      ) : (
        <RegisterForm routeToLoginIn={() => setLoginIn(true)}></RegisterForm>
      )}
    </LoginPageWrapper>
  )
}
