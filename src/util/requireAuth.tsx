import { Navigate, useLocation } from 'react-router-dom'
import cache from './cache'
import { TOKEN_NAME } from '../global/varible'
export const RequireAuth = ({ children }: { children: any }) => {
  const location = useLocation()
  const token = cache.getCache(TOKEN_NAME)
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />
  return <div>{children}</div>
}
