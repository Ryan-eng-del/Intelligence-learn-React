import LoginLayout from 'publicComponents/LoginLayout'

import { useGetCaptcha, useGetEmailCode, useRegister } from 'server/fetchLogin'
import LocalCache from 'util/cache'
import { useSid } from './useSid'
import { useEffect } from 'react'
import { useForm, useWatch } from 'antd/es/form/Form'
import { useNavigate } from 'react-router-dom'
import { GlobalMessage } from 'publicComponents/GlobalMessage'

const RegisterPage = () => {
  /* 获取验证码API */
  const { data: captchaData, mutateAsync: getCaptchaApi } = useGetCaptcha()
  const { mutateAsync: register, isLoading: registerLoading, isError: loginError } = useRegister()
  const { setSid, sidRef } = useSid()
  const navigate = useNavigate()
  const { mutateAsync: getEmailCodeApi } = useGetEmailCode()

  const [form] = useForm()
  const email = useWatch('email', form)

  useEffect(() => {
    ;(async () => {
      const s = await getCaptchaApi()
      setSid(s.verifyKey)
    })()
  }, [])

  /* 登录逻辑处理 */
  const onFinish = async (userLoginInfo: any) => {
    if (!userLoginInfo.remember) {
      LocalCache.deleteCache('UserInfo')
    }
    userLoginInfo.verifyKey = sidRef.current
    delete userLoginInfo.remember

    try {
      await register(userLoginInfo)
      GlobalMessage('success', '注册成功！！👋')
      navigate('/login')
    } catch (e) {
      GlobalMessage('info', '注册失败！请重试')
    }
  }

  /* 获取邮箱验证码 */
  const getEmailCode = async () => {
    await getEmailCodeApi(email)
  }

  return (
    <LoginLayout
      getEmailCode={getEmailCode}
      form={form}
      isLoginPage={false}
      onFinish={onFinish}
      loading={registerLoading}
      captcha={captchaData?.codeImg}
      refresh={getCaptchaApi}
    ></LoginLayout>
  )
}

export default RegisterPage
