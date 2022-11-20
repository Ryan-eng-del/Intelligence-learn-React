import { useEffect, useRef } from 'react'
import LocalCache from '../../util/cache'
import { v4 as uuidv4 } from 'uuid'

export const useSid = () => {
  const sidRef = useRef('')

  useEffect(() => {
    const sid = LocalCache.getCache('uuid_intel')
    if (!sid) {
      sidRef.current = uuidv4()
      LocalCache.setCache('uuid_intel', sidRef.current)
    } else {
      sidRef.current = sid
    }
  }, [])
  return sidRef
}
