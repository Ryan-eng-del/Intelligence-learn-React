import React from 'react'
import { LoginPageIntro, IntroLineOne, IntroLineTwo } from './LoginIntroStyle'

export const LoginIntro = () => {
  return (
    <LoginPageIntro>
      <IntroLineOne>
        <div className="small-intro">This is a platform about</div>

        <div className="en-line-two">
          Discrete Mathematics,Intelligent Guide Learning.
        </div>
      </IntroLineOne>
      <IntroLineTwo>
        <div className="small-intro">这是一个平台关于---</div>
        <div className="discrete">离散数学智能导学</div>
      </IntroLineTwo>
    </LoginPageIntro>
  )
}
