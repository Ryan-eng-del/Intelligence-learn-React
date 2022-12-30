import { useRef } from 'react'
import LocalCache from 'util/cache'

export const useSid = () => {
  const sidRef = useRef('')
  const setSid = (uuid: string) => {
    const sid = LocalCache.getCache('uuid_intel')
    if (!sid) {
      sidRef.current = uuid
      LocalCache.setCache('uuid_intel', sidRef.current)
    } else {
      sidRef.current = uuid
    }
  }
  return { setSid, sidRef }
}
