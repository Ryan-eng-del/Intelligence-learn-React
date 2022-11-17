import React, { useState } from 'react'
import { LoginPageWrapper, ContanierWrapper, BoardWrapper } from './LoginPageStyle'
import { LoginForm, LoginIntro, RegisterForm } from 'components/LoginPage'
import { Avatar } from 'antd'
import { useToken } from 'server/fetchLogin'
import { BaseLoading } from '../../baseUI/BaseLoding/BaseLoading'

export const LoginPage: React.FC = () => {
  const { mutate, isLoading } = useToken('jk', 'Jk')
  const [loginIn, setLoginIn] = useState(true)
  const [load, setload] = useState(false)

  if (isLoading) return <BaseLoading />

  return (
    // <LoginPageWrapper>
    //   <AvatarWrapper>
    //     <Avatar
    //       size="large"
    //       src={require('assets/img/1657465165516.png')}
    //       style={{ backgroundColor: 'rgb(100,255,218)', borderRadius: '12px' }}
    //     />
    //   </AvatarWrapper>
    //   <LoginIntro />
    //   {loginIn ? (
    //     <LoginForm mutate={mutate} routeToRegister={() => setLoginIn(false)} />
    //   ) : (
    //     <RegisterForm routeToLoginIn={() => setLoginIn(true)}></RegisterForm>
    //   )}
    // </LoginPageWrapper>
    <LoginPageWrapper>
      <ContanierWrapper>
        <BoardWrapper>
          {
            load ? (
              // <img width="100%" height="100%" src='https://source.unsplash.com/random/700x980/?sky' onLoad={()=>setload(true)} />
              <></>
            ) :
              (
                <BaseLoading style={{ position: 'absolute', top: '40%' }} />
              )
          }
          <img width="100%" height="100%" src='https://source.unsplash.com/random/700x980/?sky' onLoad={() => { setload(true) }} />
        </BoardWrapper>
        <BoardWrapper>
          {loginIn ? (
            <LoginForm mutate={mutate} routeToRegister={() => setLoginIn(false)} />
          ) : (
            <RegisterForm routeToLoginIn={() => setLoginIn(true)}></RegisterForm>
          )}
        </BoardWrapper>
      </ContanierWrapper>
    </LoginPageWrapper>
  )
}
