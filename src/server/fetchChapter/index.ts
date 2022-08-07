import { useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
export const useShowCreateChatper = ({ course_id }: { course_id: number }) => {
  return useQuery(['chapter'], async () => {
    await delayFetch()
    return client.get({
      url: '18796758',
      params: {
        course_id
      }
    })
  })
}
