import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import HomeItems from './config'
import { createHomeNavMap } from 'util/createNavMap'
import { useUserInfo } from '../../context/UserInfoContext'
import GlobalLayout from 'publicComponents/GlobalLayout/index'

const HomePage = () => {
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

export default HomePage
