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
import { LoginFormWrapper, ButtonWrapper } from './LoginFormStyle'

export const LoginForm: React.FC<{
  mutate: any
  routeToRegister: () => void
}> = ({ mutate, routeToRegister }) => {
  return (
    <LoginFormWrapper>
      <h1>Login In</h1>
      <div className="input-group">
        <label className="label">Name</label>
        <input autoComplete="off" name="Email" id="Email" className="input" type="email" />
      </div>
      <div className="input-group">
        <label className="label">PassWord</label>
        <input autoComplete="off" name="Email" id="Email" className="input" type="email" />
      </div>

      <div className="forget-password">忘记密码</div>
      <button className='btn' onClick={() => {
        mutate({ name: 'jk', password: 'jjk' })
      }}><CheckOutlined />   登录</button>
      <button className='btn' onClick={routeToRegister}><ArrowRightOutlined />   注册</button>

      {/* <ButtonWrapper>
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
      </ButtonWrapper> */}
    </LoginFormWrapper>
  )
}
