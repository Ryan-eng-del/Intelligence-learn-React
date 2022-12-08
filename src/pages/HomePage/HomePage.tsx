import { GlobalLayout } from 'publicComponents/GlobalLayout/index'
import { Outlet } from 'react-router-dom'
import HomeItems from './config'
import { createHomeNavMap } from 'util/createNavMap'
import { useUserInfo } from '../../context/UserInfoContext'
import { useEffect } from 'react'

export const HomePage = () => {
  const { userInfo, getUserInfo } = useUserInfo()
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <GlobalLayout
        navItems={HomeItems}
        routePage={<Outlet />}
        sliceCount={5}
        layoutName={'home'}
        layoutData={userInfo}
        createMapFunction={createHomeNavMap}
      />
    </>
  )
}
