import { Navigate, useLocation } from 'react-router-dom'
import cache from './cache'
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const token = cache.getCache('token')
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />
  return <div>{children}</div>
}
