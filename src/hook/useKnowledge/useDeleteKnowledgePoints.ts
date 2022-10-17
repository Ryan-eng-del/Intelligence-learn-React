/*删除知识点*/
import { useDeleteKnowledgeAPI } from '../../server/fetchKnowledge'
import { useCallback } from 'react'
import { deleteKnowledgeNode } from '../../util/knowledgeTree'
import { IKnowledgePoint } from './type'
import { IHandleChapterControl } from '../useChapterStudy/type'
import { useQueryClient } from '@tanstack/react-query'

export const useDeleteKnowledgePoints = (props: Omit<IHandleChapterControl<IKnowledgePoint>, 'chapterState'>) => {
  const { data, dispatchChapter: dispatch } = props
  const { mutateAsync: deleteKnowPointsAPI } = useDeleteKnowledgeAPI()
  const queryClient = useQueryClient()
  const deleteKnowledgePoint = useCallback(
    async (id: string) => {
      try {
        await deleteKnowPointsAPI({ pointIds: [id] })
        deleteKnowledgeNode(data, id, queryClient)
      } catch (err) {
        dispatch({ type: 'setError', error: err })
      }
    },
    [data]
  )
  return { deleteKnowledgePoint }
}
