import { useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { ResourceType } from './types'
// 显示资源列表
export const useShowResourceList = () => {
  return useQuery(['resources'], async () => {
    await delayFetch()
    return client.get<ResourceType[]>({
      url: 'resources/list-resources'
    })
  })
}
