import LoginLayout from 'publicComponents/LoginLayout'
import { useGetCaptcha, useToken } from '../../server/fetchLogin'
import LocalCache from 'util/cache'
import { useSid } from './useSid'
import { useEffect } from 'react'

export const LoginPage = () => {
  /* 获取验证码API */
  const sid = useSid()
  const { data: captchaData, mutateAsync: getCaptchaApi } = useGetCaptcha()
  const { mutateAsync: login, isLoading: loginLoading } = useToken()
  useEffect(() => {
    ;(async () => {
      if (sid) await getCaptchaApi(sid.current)
    })()
  }, [])

  /* 登录逻辑处理 */
  const onFinish = async (userLoginInfo: any) => {
    if (!userLoginInfo.remember) {
      LocalCache.deleteCache('UserInfo')
    }
    console.log(userLoginInfo, 'info')
    delete userLoginInfo.remember
    userLoginInfo.verifyKey = sid.current
    await login(userLoginInfo)
  }

  return (
    <LoginLayout
      isLoginPage={true}
      onFinish={onFinish}
      loading={loginLoading}
      captcha={captchaData?.codeImg}
      refresh={getCaptchaApi}
    ></LoginLayout>
  )
}
