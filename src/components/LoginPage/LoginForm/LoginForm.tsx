import React from 'react'
import { Input, Button } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  CompassOutlined,
  CheckOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import { LoginFormWrapper, LoginTitle, ButtonWrapper } from './LoginFormStyle'

export const LoginForm: React.FC<{
  mutate: any
  routeToRegister: () => void
}> = ({ mutate, routeToRegister }) => {
  return (
    <LoginFormWrapper>
      <LoginTitle>
        <p className="title-login">Login In</p>
      </LoginTitle>
      <Input
        size="large"
        placeholder="请您输入用户名"
        prefix={<UserOutlined />}
        style={{ marginBottom: '20px' }}
      />
      <Input.Password
        placeholder="请您输入密码"
        prefix={<CompassOutlined />}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <div className="forget-password">忘记密码</div>
      <ButtonWrapper>
        <Button
          type="primary"
          onClick={() => {
            mutate({ name: 'jk', password: 'jjk' })
          }}
          icon={<CheckOutlined />}
        >
          登录
        </Button>
        <Button
          type="primary"
          onClick={routeToRegister}
          icon={<ArrowRightOutlined />}
        >
          前往注册
        </Button>
      </ButtonWrapper>
    </LoginFormWrapper>
  )
}