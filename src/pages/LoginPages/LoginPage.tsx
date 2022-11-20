import LoginLayout from 'publicComponents/LoginLayout'
import { useGetCaptcha, useToken } from '../../server/fetchLogin'
import LocalCache from 'util/cache'
import { useSid } from './useSid'
import { useEffect, useRef } from 'react'

export const LoginPage = () => {
  /* 获取验证码API */

  const { data: captchaData, mutateAsync: getCaptchaApi } = useGetCaptcha()
  const { mutateAsync: login, isLoading: loginLoading } = useToken()
  const sid = useRef()
  const refresh = async () => {
    const s = await getCaptchaApi()
    sid.current = s.verifyKey
    console.log(sid.current, 'sid')
  }

  useEffect(() => {
    ;(async () => {
      await refresh()
    })()
  }, [])

  /* 登录逻辑处理 */
  const onFinish = async (userLoginInfo: any) => {
    if (!userLoginInfo.remember) {
      LocalCache.deleteCache('UserInfo')
    }
    userLoginInfo.verifyKey = sid.current
    delete userLoginInfo.remember
    console.log(userLoginInfo, 'info')

    await login(userLoginInfo)
  }

  return (
    <LoginLayout
      isLoginPage={true}
      onFinish={onFinish}
      loading={loginLoading}
      captcha={captchaData?.codeImg}
      refresh={refresh}
    ></LoginLayout>
  )
}
