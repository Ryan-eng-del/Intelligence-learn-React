import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { ChapterFolderType } from '../types'

export const useChapterList = (courseId: string) => {
  return useQuery([`ChapterList-${courseId}`], async () => {
    await delayFetch() //  模拟延时
    return client.get<{ ChapterData: ChapterFolderType[] }>({
      url: '18796758',
      params: { courseId: courseId }
    })
  })
}

export const useCreateFolder = (
  courseId: string
) => {
  return useMutation(
    async () => {
      await delayFetch()
      return client.post({
        url: '18855562',
        data: { courseId }
      })
    },
  )
}

export const useCreateFolderAtRoot = (
  courseId: string
) => {
  return useMutation(
    async () => {
      await delayFetch()
      return client.post({
        url: '18855549',
        data: { courseId }
      })
    },
  )
}

export const useDeleteFolder = (
  id: string
) => {
  return useMutation(
    async () => {
      await delayFetch()
      return client.delete({
        url: '19680940',
        data: { id }
      })
    },
  )
}