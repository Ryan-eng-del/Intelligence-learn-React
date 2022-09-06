import { useQueryClient } from '@tanstack/react-query'
import { useShowKnowledgeTree } from '../../server/fetchKnowledge'
import { StateSetter } from 'types'

export const useKnowledgeServer: any = (
  setExpandKeys: StateSetter<string[]>
) => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useShowKnowledgeTree(setExpandKeys)
  return {
    queryClient,
    data,
    isLoading
  }
}
