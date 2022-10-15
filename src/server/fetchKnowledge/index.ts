import { useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { StateSetter } from 'types'
import { delayFetch } from 'util/delayFetch'
import { generateKnowledgeKeys } from 'util/knowledgeTree'
import { KnowledgeNodeType } from './types'
/*展示章节学习树*/
export const useShowKnowledgeTree = (setExpandKeys?: StateSetter<string[]>) => {
  return useQuery(
    ['knowledgeTree'],
    async () => {
      await delayFetch()
      return client.get({
        url: 'points/show'
      })
    },
    {
      onSuccess: (data: KnowledgeNodeType[]) => {
        setExpandKeys ? setExpandKeys(generateKnowledgeKeys(data)) : 0
      }
    }
  )
}
/* 添加知识点 */
// export const useAddKonwledgePoints = () => {}
