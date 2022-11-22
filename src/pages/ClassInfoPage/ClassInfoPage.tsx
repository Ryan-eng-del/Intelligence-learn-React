import { GlobalLayout } from 'publicComponents/GlobalLayout'
import { Outlet, useParams } from 'react-router-dom'
import { createClassNavMap } from 'util/createNavMap'
import ClassInfoNavItems from './config'
import { useEffect, useMemo } from 'react'
import { isTeachAuth } from '../../util/isAuthTeach'
import { useCurrentClassInfo } from '../../context/ClassInfoContext'
import 'lib/aliyun-upload-sdk/aliyun-upload-sdk-1.5.4.min'
import OSS from 'lib/aliyun-upload-sdk/lib/aliyun-oss-sdk-6.17.1.min'
import AliYunOSS from '../../util/AliYunOSS'

Object.defineProperty(window, 'OSS', {
  value: OSS
})

export const ClassInfoPage = () => {
  const { classInfo, getCurCourseInfo } = useCurrentClassInfo()
  const params = useParams()
  const aliYunOSS = new AliYunOSS(OSS)

  useEffect(() => {
    getCurCourseInfo(params.id!)
  }, [])

  const sliceCount = useMemo(() => {
    if (params) {
      return params.identify!.length + params.id!.length + 2
    }
  }, [params])

  return (
    <GlobalLayout
      layoutName={'classInfo'}
      layoutData={classInfo}
      navItems={isTeachAuth() ? ClassInfoNavItems : ClassInfoNavItems.slice(1)}
      routePage={<Outlet />}
      sliceCount={sliceCount as number}
      createMapFunction={createClassNavMap}
    />
  )
}
