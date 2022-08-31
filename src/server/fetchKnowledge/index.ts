import { useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { generateKnowledgeKeys } from 'util/knowledgeTree'
/*展示章节学习树*/
export const useShowKnowledgeTree = (setExpandKeys: any) => {
  return useQuery(
    ['knowledgeTree'],
    async () => {
      await delayFetch()
      return client.get({
        url: 'points/show'
      })
    },
    {
      onSuccess: (data: any) => {
        setExpandKeys(generateKnowledgeKeys(data))
      }
    }
  )
}
