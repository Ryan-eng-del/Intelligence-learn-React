import { GlobalLayout } from 'publicComponents/GlobalLayout'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { createClassNavMap } from 'util/createNavMap'
import ClassInfoNavItems from './config'
import { useUserInfo } from '../../context/UserInfoContext'
import { useEffect, useMemo } from 'react'
import { isTeachAuth } from '../../util/isAuthTeach'
import { useCurrentClassInfo } from '../../context/ClassInfoContext'

export const ClassInfoPage = () => {
  const userInfoContext = useUserInfo()
  const location = useLocation()
  const classInfoContext = useCurrentClassInfo()
  const params = useParams()

  useEffect(() => {
    if (userInfoContext?.getUserInfo) {
      userInfoContext.getUserInfo()
    }
  }, [])
  useEffect(() => {
    classInfoContext.getCurCourseInfo(params.id!)
  }, [])

  const len = useMemo(() => {
    if (params) {
      const identify = params.identify!
      return location.pathname.indexOf(identify) + identify?.length
    }
  }, [location.pathname, params.identify])

  return (
    <GlobalLayout
      navItems={isTeachAuth() ? ClassInfoNavItems : ClassInfoNavItems.slice(1)}
      routePage={<Outlet />}
      sliceCount={len as number}
      createMapFunction={createClassNavMap}
      logoWrapper={(name: string) => (
        <>
          <img src={require('assets/img/class.jpg')} />
          <span style={{ textAlign: 'center' }}>{name}</span>
        </>
      )}
    />
  )
}
