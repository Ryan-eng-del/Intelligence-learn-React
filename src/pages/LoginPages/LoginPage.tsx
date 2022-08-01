import React from 'react'
import { LoginPageWrapper, AvatarWrapper } from './LoginPageStyle'
import { LoginForm, LoginIntro } from 'components/LoginPage'
import { Avatar } from 'antd'
import { useToken } from 'server/fetchLogin'
import { BaseSpin } from 'baseUI/BaseSpin/BaseSpin'
export const LoginPage = () => {
  const { mutate, isLoading } = useToken('jk', 'Jk')
  if (isLoading) return <BaseSpin title="正在登录中……"></BaseSpin>

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
      <LoginForm mutate={mutate} />
    </LoginPageWrapper>
  )
}
