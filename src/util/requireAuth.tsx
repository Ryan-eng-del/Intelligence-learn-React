import { Navigate, useLocation } from 'react-router-dom'
import cache from './cache'
export const RequireAuth = ({ children }: { children: any }) => {
  const location = useLocation()
  const token = cache.getCache('token_intel')
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />
  return <div>{children}</div>
}
