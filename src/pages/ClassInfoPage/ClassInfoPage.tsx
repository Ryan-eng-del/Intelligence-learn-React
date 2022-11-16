import { GlobalLayout } from 'publicComponents/GlobalLayout'
import { Outlet } from 'react-router-dom'
import ClassInfoNavItems from 'pages/ClassInfoPage/config'

export const ClassInfoPage = () => {
  return (
    <>
      <GlobalLayout navItems={ClassInfoNavItems} routePage={<Outlet />}></GlobalLayout>
    </>
  )
}
