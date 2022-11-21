import { useParams } from 'react-router-dom'
import { useGetResource } from 'server/fetchResource'

export const useGetResourceById = () => {
  const resourceId = useParams().resourceId!
  const { data, isLoading, isError } = useGetResource(resourceId)
  return { data, isError, isLoading, resourceId }
}
