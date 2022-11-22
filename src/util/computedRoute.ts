import { useLocation } from 'react-router-dom'

export const useComputedRoute = (str: string) => {
  const { pathname } = useLocation()
  return pathname.slice(0, pathname.indexOf(str))
}
