import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { LoginFormWrapper } from './LoginFormStyle'

export const LoginForm: React.FC<{
  mutate: any
  routeToRegister: () => void
}> = ({ mutate, routeToRegister }) => {
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  return (
    <LoginFormWrapper>
      <h1>Login In</h1>
      <div className="input-group">
        <label className="label">Name</label>
        <input
          autoComplete="off"
          name="Email"
          id="Email"
          className="input"
          type="email"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div className="input-group">
        <label className="label">PassWord</label>
        <input
          autoComplete="off"
          name="Email"
          id="Email"
          className="input"
          type="email"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <div className="forget-password">忘记密码</div>
      <button
        className="btn"
        onClick={() => {
          mutate({ name: userName, password: password })
        }}
      >
        <CheckOutlined /> 登录
      </button>
      <button className="btn" onClick={routeToRegister}>
        <ArrowRightOutlined /> 注册
      </button>

      {/* <ButtonWrapper>
        <Button
          type="primary"
          onClick={() => {
            mutate({ name: userName, password: password })
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
