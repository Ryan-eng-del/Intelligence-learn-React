import { createContext, useCallback, useContext, useState } from 'react'
import { useGetUserInfo } from '../../server/fetchLogin'

interface IUserInfo {
  name: string
  sex: number
  school: string
  email: string
  mobile: string
  personalSignature: string
  headPortrait: null
}

interface IUserInfoContext {
  getUserInfo: () => void
  userInfo: IUserInfo | null
}

const UserInfoContext = createContext<IUserInfoContext | null>(null)

export const UserInfoContextProvider = (props: any) => {
  const [userInfo, setUserInfo] = useState(null)
  const { mutateAsync } = useGetUserInfo()

  const getUserInfo = useCallback(async () => {
    const data = await mutateAsync()
    setUserInfo(data)
  }, [])
  return <UserInfoContext.Provider value={{ getUserInfo, userInfo }}>{props.children}</UserInfoContext.Provider>
}

export const useUserInfo = () => {
  const context = useContext(UserInfoContext)

  if (context) {
    const { getUserInfo, userInfo } = context
    return { getUserInfo, userInfo }
  } else return null
}
