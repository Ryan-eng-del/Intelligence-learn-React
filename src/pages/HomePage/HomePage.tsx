import { GlobalLayout } from '../../publicComponents/GlobalLayout/index'
import { Outlet } from 'react-router-dom'
import HomeItems from './config'
import { createHomeNavMap } from '../../util/createNavMap'

export const HomePage = () => {
  return (
    <>
      <GlobalLayout
        navItems={HomeItems}
        routePage={<Outlet />}
        sliceCount={5}
        createMapFunction={createHomeNavMap}
        logoWrapper={() => <></>}
      />
    </>
  )
}
