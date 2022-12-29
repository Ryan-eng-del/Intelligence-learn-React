/*删除知识点*/
import { useDeleteKnowledgeAPI } from 'server/fetchKnowledge'
import { useCallback } from 'react'
import { deleteKnowledgeNode } from '../../helper/knowledgeTree'
import { IKnowledgePoint } from './type'
import { IHandleChapterControl } from '../useChapterStudy/type'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const useDeleteKnowledgePoints = (props: Omit<IHandleChapterControl<IKnowledgePoint>, 'chapterState'>) => {
  const { data, dispatchChapter: dispatch } = props
  const classInfo = {
    courseId: useParams().id!
  }
  const { mutateAsync: deleteKnowPointsAPI } = useDeleteKnowledgeAPI()
  const queryClient = useQueryClient()
  const deleteKnowledgePoint = useCallback(
    async (id: string) => {
      deleteKnowledgeNode(data, id, queryClient, classInfo.courseId)
      try {
        await deleteKnowPointsAPI({ pointIds: [id] })
      } catch (err) {
        dispatch({ type: 'setError', error: err })
        queryClient.invalidateQueries(['knowledgeTree', classInfo.courseId])
      }
    },
    [data]
  )
  return { deleteKnowledgePoint }
}
