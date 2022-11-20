import LoginLayout from 'publicComponents/LoginLayout'

import { useGetCaptcha, useRegister } from '../../server/fetchLogin'
import LocalCache from '../../util/cache'
import { useSid } from './useSid'
import { useEffect } from 'react'

const RegisterPage = () => {
  /* 获取验证码API */
  const sidRef = useSid()
  const { data: captchaData, mutateAsync: getCaptchaApi } = useGetCaptcha()
  const { mutateAsync: login, isLoading: registerLoading, isError: loginError } = useRegister()
  useEffect(() => {
    ;(async () => {
      if (sidRef.current) await getCaptchaApi(sidRef.current)
    })()
  }, [])

  /* 登录逻辑处理 */
  const onFinish = async (userLoginInfo: any) => {
    if (!userLoginInfo.remember) {
      LocalCache.deleteCache('UserInfo')
    }
    delete userLoginInfo.remember

    await login(userLoginInfo)
  }

  return (
    <LoginLayout
      isLoginPage={false}
      onFinish={onFinish}
      loading={registerLoading}
      captcha={captchaData?.codeImg}
      refresh={getCaptchaApi}
    ></LoginLayout>
  )
}

export default RegisterPage
