import { GlobalLayout } from 'publicComponents/GlobalLayout'
import { Outlet, useParams } from 'react-router-dom'
import { createClassNavMap } from 'util/createNavMap'
import ClassInfoNavItems from './config'
import { useUserInfo } from '../../context/UserInfoContext'
import { useEffect, useMemo } from 'react'
import { isTeachAuth } from '../../util/isAuthTeach'
import { useCurrentClassInfo } from '../../context/ClassInfoContext'

export const ClassInfoPage = () => {
  const userInfoContext = useUserInfo()
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

  const sliceCount = useMemo(() => {
    if (params) {
      return params.identify!.length + params.id!.length + 2
    }
  }, [params])

  return (
    <GlobalLayout
      navItems={isTeachAuth() ? ClassInfoNavItems : ClassInfoNavItems.slice(1)}
      routePage={<Outlet />}
      sliceCount={sliceCount as number}
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
