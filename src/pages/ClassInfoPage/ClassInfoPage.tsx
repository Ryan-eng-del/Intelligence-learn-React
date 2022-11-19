import { GlobalLayout } from 'publicComponents/GlobalLayout'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { createClassNavMap } from 'util/createNavMap'
import ClassInfoNavItems from './config'
import { useUserInfo } from '../../context/UserInfoContext'
import { useEffect, useMemo } from 'react'

export const ClassInfoPage = () => {
  const userInfoContext = useUserInfo()
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    if (userInfoContext?.getUserInfo) {
      userInfoContext.getUserInfo()
    }
  }, [])

  const len = useMemo(() => {
    if (params) {
      const identify = params.identify!
      return location.pathname.indexOf(identify) + identify?.length
    }
  }, [location.pathname, params.identify])

  return (
    <GlobalLayout
      navItems={ClassInfoNavItems}
      routePage={<Outlet />}
      sliceCount={len as number}
      createMapFunction={createClassNavMap}
    />
  )
}
