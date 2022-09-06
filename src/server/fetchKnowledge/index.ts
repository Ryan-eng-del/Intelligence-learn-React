import { useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { StateSetter } from 'types'
import { delayFetch } from 'util/delayFetch'
import { generateKnowledgeKeys } from 'util/knowledgeTree'
import { KnowledgeNodeType } from './types'
import { QueryHookFn } from 'types'
/*展示章节学习树*/
export const useShowKnowledgeTree: QueryHookFn
= ( setExpandKeys: StateSetter<string[]> ) => {
  return useQuery(
    ['knowledgeTree'],
    async () => {
      await delayFetch()
      return client.get<KnowledgeNodeType>({
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
