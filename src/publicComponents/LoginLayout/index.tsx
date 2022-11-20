import styled from 'styled-components'
import { Typography } from 'antd'
import { LockOutlined, UserOutlined, HomeOutlined, CodeOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form } from 'antd'
import classnames from 'classnames'

import style from './index.module.css'

import { FormItem } from 'publicComponents/FormItem'

import LoginSpinner from 'publicComponents/LoginSpinner'

import Cache from 'util/cache'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

/* 样式覆盖ant-input-prefix */
const OverrideAntInputPrefix = styled.div`
  .ant-input-prefix {
    margin-right: 0.625rem;
  }

  .ant-btn-primary {
    width: 100%;
    height: 2.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
  }

  .ant-form-item-with-help .ant-form-item-explain {
    margin-bottom: 1.25rem;
  }
`

interface LoginLayoutProps {
  onFinish: (value: any) => void
  isLoginPage: boolean
  loading: boolean
  error?: Error
  captcha: string
  refresh: any
}

const LoginLayout = (props: LoginLayoutProps) => {
  const { onFinish, isLoginPage, loading, captcha, refresh } = props
  const userInfo = Cache.getCache('UserInfo')
  const username = isLoginPage ? userInfo?.username : ''
  const password = isLoginPage ? userInfo?.password : ''

  return (
    <div className={style['auth-form']}>
      <div className={style['auth-wrapper']}>
        {isLoginPage ? (
          <section className={style['auth-left-wrapper-login']}>
            <img src={require('assets/img/back-authForm.png')} style={{ width: '100%' }} />
          </section>
        ) : (
          <section className={style['auth-left-wrapper-register']}>
            <img src={require('assets/img/back-authRegister.png')} style={{ width: '100%' }} />
          </section>
        )}
        <section className={style['auth-right-wrapper']}>
          <div className="absolute top-5 left-2/4" style={{ transform: 'translateX(-50%)' }}>
            {loading && <LoginSpinner />}
          </div>
          <Title level={2}>Hey! hello👋</Title>
          <Text
            style={{
              marginBottom: '25px',
              display: 'inline-block',
              color: 'rgb(155, 155, 155)'
            }}
          >
            欢迎
            <span style={{ color: 'rgb(64, 169, 255)', padding: '0 3px' }}>{isLoginPage ? '登录' : '注册'}</span>
            智能学习社区 !
          </Text>

          <OverrideAntInputPrefix>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true, username, password }}
              onFinish={onFinish}
            >
              <FormItem
                filed={'username'}
                placeholder={'请输入邮箱'}
                prefix={<UserOutlined className="site-form-item-icon" />}
                rules={[
                  { required: true, message: '用户名/邮箱不能为空' },
                  {
                    type: 'email',
                    message: '请输入正确的邮箱格式'
                  }
                ]}
              ></FormItem>

              {/* 注册时的昵称 */}
              {!isLoginPage && (
                <FormItem
                  filed={'nickname'}
                  placeholder={'请输入昵称'}
                  prefix={<HomeOutlined className="site-form-item-icon" />}
                  rules={[
                    { required: true, message: '昵称不能为空' },
                    {
                      pattern: /^[\d\w\u4e00-\u9fa5]{2,15}$/,
                      message: '昵称由2到15个,汉字,数字或者字母组成'
                    }
                  ]}
                ></FormItem>
              )}

              <FormItem
                filed={'password'}
                placeholder={'请输入密码'}
                prefix={<LockOutlined className="site-form-item-icon" />}
                rules={[
                  { required: true, message: '密码不能为空' },
                  !isLoginPage && {
                    pattern: /^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/,
                    message: '6到20位密码,支持大小写字母和数字,最少两种组合'
                  }
                ]}
              ></FormItem>
              <section style={{ display: 'flex', alignItems: 'center' }}>
                {!captcha ? (
                  <div style={{ width: '130px', height: '20px' }}></div>
                ) : (
                  <img
                    src={captcha}
                    style={{ position: 'relative', top: '-10px' }}
                    onClick={refresh}
                    alt={'正在获取'}
                  />
                )}

                <FormItem
                  filed={'verifyCode'}
                  placeholder={'输入验证码'}
                  prefix={<CodeOutlined className="site-form-item-icon" />}
                  rules={[
                    { required: true, message: '验证码不能为空' },
                    {
                      pattern: /^\w{4}$/,
                      message: '请输入四位验证码'
                    }
                  ]}
                ></FormItem>
              </section>
              {/* 登录时的忘记密码和记住我 */}
              {isLoginPage && (
                <Form.Item>
                  <div className={classnames(style['tool-tip'])}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="">
                      忘记密码
                    </a>
                  </div>
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  style={{ height: '2.75rem' }}
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  {isLoginPage ? '登录' : '注册'}
                </Button>
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Link to={!isLoginPage ? '/login' : '/register'}>立即{!isLoginPage ? '登录' : '注册'}!</Link>
                </div>
              </Form.Item>
            </Form>
          </OverrideAntInputPrefix>
        </section>
      </div>
    </div>
  )
}

export default LoginLayout
