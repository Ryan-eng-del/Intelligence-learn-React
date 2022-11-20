/*删除章节和课时*/
import { ChapterTreeData, IHandleChapterControl } from './type'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteChapter, useDeleteClassTime, useDeleteResource } from '../../server/fetchChapter'
import { useCallback } from 'react'
import { deleteResource, deleteTreeContent, deleteTreeNode } from '../../helper/chapterStudyTree'
import { useCurrentClassInfo } from '../../context/ClassInfoContext'

export const useHandleDeleteChapter = (props: Omit<IHandleChapterControl<ChapterTreeData>, 'chapterState'>) => {
  const { data, dispatchChapter } = props
  const queryClient = useQueryClient()
  const { classInfo } = useCurrentClassInfo()

  /*删除章节API*/
  const { mutateAsync: deleteChapterMutate } = useDeleteChapter()
  const { mutateAsync: deleteClassTimeMutate } = useDeleteClassTime()
  const { mutateAsync: deleteResourceMutate } = useDeleteResource()
  /*删除章节*/
  const handleDeleteTreeNode = useCallback(
    async (id: string) => {
      try {
        await deleteChapterMutate(id)
        deleteTreeNode(data ?? [], id, queryClient, classInfo.courseId)
      } catch (err: unknown) {
        dispatchChapter({ type: 'setError', error: err })
      }
    },
    [data]
  )
  /*删除课时*/
  const handleDeleteTreeContent = useCallback(
    async (id: string) => {
      try {
        await deleteClassTimeMutate(id)
        deleteTreeContent(data ?? [], id, queryClient, classInfo.courseId)
      } catch (err: unknown) {
        dispatchChapter({ type: 'setError', error: err })
      }
    },
    [data]
  )
  /*删除资源*/
  const handleDeleteResource = useCallback(
    async (id: string) => {
      try {
        await deleteResourceMutate(id)
        deleteResource(data ?? [], id, queryClient, classInfo.courseId)
      } catch (err) {
        dispatchChapter({ type: 'setError', error: err })
      }
    },
    [data]
  )
  return { handleDeleteTreeNode, handleDeleteTreeContent, handleDeleteResource }
}
