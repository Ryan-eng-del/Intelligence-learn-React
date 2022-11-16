import { GlobalLayout } from '../../publicComponents/GlobalLayout/index'
import { Outlet } from 'react-router-dom'
import HomeItems from './config/index'

export const HomePage = () => {
  return <GlobalLayout navItems={HomeItems} routePage={<Outlet />} />
}
