import { useParams } from 'react-router-dom'

export const isTeachAuth = () => {
  return useParams()?.identify === 'MyTeach' ? true : false
}
