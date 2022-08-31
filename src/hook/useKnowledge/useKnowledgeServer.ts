import { useQueryClient } from '@tanstack/react-query'
import { useShowKnowledgeTree } from '../../server/fetchKnowledge'

export const useKnowledgeServer = (setExpandKeys: any) => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useShowKnowledgeTree(setExpandKeys)
  return {
    queryClient,
    data,
    isLoading
  }
}
