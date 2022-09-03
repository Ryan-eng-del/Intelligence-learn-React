import { useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
// 显示课程
export const useShowResourceList = () => {
  return useQuery(['resources'], async () => {
    await delayFetch()
    return client.get<any>({
      url: 'resources/list-resources'
    })
  })
}