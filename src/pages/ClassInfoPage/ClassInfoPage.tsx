import { GlobalLayout } from 'publicComponents/GlobalLayout'
import { Outlet } from 'react-router-dom'
import ClassInfoNavItems from 'pages/ClassInfoPage/config'
import { createClassNavMap } from 'util/createNavMap'

export const ClassInfoPage = () => {
  return (
    <GlobalLayout
      navItems={ClassInfoNavItems}
      routePage={<Outlet />}
      sliceCount={10}
      createMapFunction={createClassNavMap}
    />
  )
}
